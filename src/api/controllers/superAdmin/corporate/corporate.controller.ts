export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status');
const generator = require('generate-password');
import { User, CorporateConfig, Corporate } from 'api/models';
import { FUNCTIONAL_ADMIN } from 'api/utils/Const';

const { pick } = require('lodash');
import { CREATED } from 'http-status';

const { handler: errorHandler } = require('api/middlewares/error');

/**
 * Load corporate and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const corporate = await CorporateConfig.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.corporate = corporate;
    return next();

    
  } catch (error) {
    return errorHandler(error, req, res);
  }
};
/**
 * Create new corporate
 * @public
 */
exports.create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { manager, config } = req.body;
    const type = FUNCTIONAL_ADMIN;
    // TODO send email to manager given her password to authentificate
    const password = generator.generate({
      length: 10,
      numbers: true
    });
    const corporateConfig = await CorporateConfig.get(config);
    if (corporateConfig) {
      //res.json(corporateConfig.transform());

      // Extract route permission of role "admin-fonctionnel" from corporateConfig rbacs
      //const rolePermissions = await extractRouteFromCorporateConfigRbacs(corporateConfig);

      let user = await User.findOne({ email: manager.email })
      // Create user account for manager
      if (!user) {
        user = new User({ ...manager, password, type });
        await user.save()
      }
      // Create corporate given corporateConfigId
      const corporate = new Corporate({ config, manager: user });

      const userCorporateId = { corporate: corporate._id, user: user._id };
      

      // Save user permission of manager
      /* const userPermission = new UserPermission({ ...rolePermissions, ...userCorporateId });

      // Add user permission to user
      user.permissions.push(userPermission._id);

      // Save all information
      await Promise.all([user.save(), userPermission.save()]);
 */
      const saveCorporate = await corporate.save();

      // Add corporateId ot corporateConfig to create bidirectionnel relation
      corporateConfig.corporate = saveCorporate._id;

      await corporateConfig.save();
      const updatedCorporateConfig = await CorporateConfig.get(config);
      res.status(CREATED).json(updatedCorporateConfig.transform());
    }
  } catch (error) {
    console.log(error);

    return errorHandler(error, req, res);
  }
};