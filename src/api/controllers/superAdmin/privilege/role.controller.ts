export { };
import { NextFunction, Request, Response } from 'express';

const httpStatus = require('http-status');
import { Role, User } from 'api/models';

const { handler: errorHandler } = require('api/middlewares/error');
import { apiJson, startTimer, checkDuplicateField } from 'api/utils/Utils';

/**
 * Load Rbac and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const role = await Role.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.role = role;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Create new role
 * @public
 */
exports.create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existedRole = await checkDuplicateRole(req.body)
    if (!existedRole) {
      const role = new Role(req.body);
      const savedRole = await role.save();
      res.status(httpStatus.CREATED);
      res.json(savedRole.transform());
    } else {
      res.send(existedRole)
    }

  } catch (error) {
    next(checkDuplicateField(error, 'role', '\'role\' already exists'));
  }
};

/**
 * Get role list
 * @public
 */
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    const data = (await Role.list(req)).transform(req);
    apiJson({ req, res, data, model: Role });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get role by id
 * @public
 */
exports.retrive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    const data = (await Role.get(req.params.roleId)).transform(req);
    apiJson({ req, res, data, model: Role });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Update existing role
 * @public
 */
exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.route.meta;
    const { user, ...others } = req.body
    const existedRole = await checkDuplicateRole(req.body)
    if (!existedRole) {
      const updatedRole = Object.assign(role, others);
      const sendUpdatedRole = await updatedRole.save();
      res.status(httpStatus.CREATED);
      res.json(sendUpdatedRole.transform());
    } else {
      res.json(existedRole);
    }

  } catch (error) {
    return errorHandler(error, req, res);
  }
};


/**
 * Delete role
 * @public
 */
exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await Role.delete({ _id: req.params.roleId })
    if (response) res.send({ data: 'role has been removed' })
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get find duplicted role (permission + corporate)
 * @public
 */
const checkDuplicateRole = async (body: any) => {
  try {
    const { permission, corporate, ...others } = body
    const data = await Role.findOne({ permission, corporate })
    return data
  } catch (error) {
    console.error(error)
  }
};