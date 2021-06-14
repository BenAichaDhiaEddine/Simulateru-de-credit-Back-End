export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status')
const { omit } = require('lodash');
import { CorporateConfig, Corporate } from 'api/models';
import { startTimer, apiJson } from 'api/utils/Utils';

const { handler: errorHandler } = require('api/middlewares/error');

/**
 * Load corporateConfig and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const corporateConfig = await CorporateConfig.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.corporateConfig = corporateConfig;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};


/**
 * Retrieve corporateConfig
 * @public
 */
exports.retrieveMyCorporateConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const corporate = await Corporate.findOne({ manager: req.route.meta.user._id });
    if (corporate) {
      const corporateConfig = await CorporateConfig.findOne({ _id: corporate.config });
      res.json(corporateConfig.toJSON());
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ message: "Corporate not found" })
    }
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Update existing corporateConfig for admin corporate
 * @public
 */
exports.updateMyCorporateConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const corporate = await Corporate.findOne({ manager: req.route.meta.user._id });
    if (corporate) {
      const corporateConfig = await CorporateConfig.findOne({ _id: corporate.config });
      const omitReqBody = omit(req.body, ['_id', '__v']);
      const updatedCorporateConfig = Object.assign(corporateConfig, omitReqBody);
      updatedCorporateConfig
        .save()
        .then((savedCorporateConfig: any) => res.json(savedCorporateConfig.transform()))
        .catch((error: any) => errorHandler(error, req, res));
      }
    

  } catch (error) {
    return errorHandler(error, req, res);
  }
};
