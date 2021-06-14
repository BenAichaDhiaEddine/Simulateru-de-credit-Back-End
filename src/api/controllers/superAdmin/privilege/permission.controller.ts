export { };
import { NextFunction, Request, Response } from 'express';
const { omit, pick } = require('lodash');

const httpStatus = require('http-status');
import { Permission } from 'api/models';

const { handler: errorHandler } = require('api/middlewares/error');
import { apiJson, startTimer, checkDuplicateField } from 'api/utils/Utils';


/**
 * Load permission and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const permission = await Permission.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.permission = permission;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Create new permission
 * @public
 */
exports.create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permission = new Permission(req.body);
    const existedRole = await checkDuplicateRole(req.body)
    if (!existedRole) {
      const savedPermission = await permission.save();
      res.status(httpStatus.CREATED);
      res.json(savedPermission.transform());
    } else {
      res.json(existedRole);
    }
  } catch (error) {
    next(checkDuplicateField(error, 'slug', '\'slug\' already exists'));
  }
};

/**
 * Get permissions list
 * @public
 */
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    const data = (await Permission.list(req)).transform(req);
    apiJson({ req, res, data, model: Permission });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get permissions by id
 * @public
 */
exports.retrive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    const data = (await Permission.get(req.params.permissionId)).transform(req);
    apiJson({ req, res, data, model: Permission });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Update existing permission
 * @public
 */
exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { permission } = req.route.meta;
    const existedRole = await checkDuplicateRole(req.body)
    if (!existedRole) {
      const updatedPermission = Object.assign(permission, req.body);
      const sendUpdatedPermission = await updatedPermission.save();
      res.status(httpStatus.CREATED);
      res.json(sendUpdatedPermission.transform());
    } else {
      res.json(existedRole);
    }
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Delete permission
 * @public
 */
exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await Permission.delete({ _id: req.params.permissionId })
    if (response) res.send({ data: 'permission has been removed' })

  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get permissions by body
 * @public
 */
const checkDuplicateRole = async (body: any) => {
  try {
    const { _id, __v, createdAt, updatedAt, deleted, ...others } = body
    const data = await Permission.findOne({ ...others })
    return data
  } catch (error) {
    console.error(error)
  }
};