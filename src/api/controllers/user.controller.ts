export {};
import { NextFunction, Request, Response, Router } from 'express';
const { omit, pick } = require('lodash');
import { Corporate, Role, User } from 'api/models';
import { startTimer, apiJson, getActiveOnly } from 'api/utils/Utils';
const httpStatus = require('http-status');
const APIError = require('api/utils/APIError');
const { handler: errorHandler } = require('../middlewares/error');
import { SUPER_ADMIN, FUNCTIONAL_ADMIN, CORPORATE_ADMIN} from '../utils/Const';
import { Console } from 'node:console';
const generator = require('generate-password');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const user = await User.get(id);
    req.route.meta = req.route.meta || {}
    req.route.meta.userFinded = user;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get logged in user info
 * @public
 */
const loggedIn = (req: Request, res: Response) => res.json(req.route.meta.user.toJSON());
exports.loggedIn = loggedIn;

/**
 * Get user
 * @public
 */
exports.get = loggedIn;

/**
 * Create Corporate Admin
 * @public
 */
exports.create = (type: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const password = generator.generate({
      length: 10,
      numbers: true
    });
    console.log("password : " , password)
    const user = new User({ ...req.body, password, type: type });
    console.log("user password : ", password)
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Delete corporate Admin
 * @public
 */
  exports.remove = (req: Request, res: Response, next: NextFunction) => {
  const {corporateAdmin } = req.route.meta;
  corporateAdmin
    .delete()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e: any) => next(e));
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.route.meta;
    const newUser = new User(req.body);
    const ommitRole = user.type !== SUPER_ADMIN ? 'type' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);
    await user.update(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (type: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let query: any = {};
    query['_id'] = req.params.userId ? req.params.userId : req.route.meta.user._id;
    if(type== FUNCTIONAL_ADMIN){
      query['_id'] = req.route.meta.user._id;
    }else{
      query['_id'] = req.params.userId ? req.params.userId : req.route.meta._id;
    }
    let userFinded = await User.findOne({
      _id: query._id,
      type: type
    });
    if (userFinded) {
      const ommitType = userFinded.type !== SUPER_ADMIN ? 'type' : '';
      const ommitPassword = 'password';
      const ommitRole = 'role';
      const updatedUser = omit(req.body, { ommitType, ommitPassword, ommitRole });
      const user = Object.assign(userFinded, updatedUser);
      user
        .save()
        .then((savedUser: any) => res.json(savedUser.toJSON()))
        .catch((e: any) => next(User.checkDuplicateEmail(e)));
    } else {
      res.status(404).send({ data: 'User NOT Found!' });
    }
  } catch (error) {
    console.error(error);
  }
};
/**
 * Update user Role
 * @public
 */
exports.updateRole = (type: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let query: any = {};

    query['_id'] = req.params.userId ? req.params.userId : req.route.meta.user._id;
    let userFinded = await User.findOne({
      _id: query._id,
      type: type
    });
    if (userFinded) {
      const updatedUser = pick(req.body, 'role');
      const user = Object.assign(userFinded, updatedUser);
      user.save().then((savedUser: any) => res.json(savedUser.transform()));
    } else {
      res.status(404).send({ data: 'User NOT Found!' });
    }
  } catch (error) {
    console.error(error);
  }
};
/**
 * Update current user
 * @public
 */
exports.updateMe = (req: Request, res: Response, next: NextFunction) => {
  const ommitRole = req.route.meta.user.type !== SUPER_ADMIN ? 'type' : '';
  const updatedUser = omit(req.body, ommitRole);
  const user = Object.assign(req.route.meta.user, updatedUser);

  user
    .save()
    .then((savedUser: any) => res.json(savedUser.transform()))
    .catch((e: any) => next(User.checkDuplicateEmail(e)));
};
/**
 * Get user list
 * @public
 * @example GET https://localhost:3009/v1/users?type=admin&limit=5&offset=0&sort=email:desc,createdAt
 */
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    
    req.query = getActiveOnly(req);
    const data = await User.find({type: FUNCTIONAL_ADMIN ,deleted : false});
    apiJson({ req, res, data , model: User });
  } catch (e) {
    next(e);
  }
};

/**
* @api get all CorporateAdmins 
* @apiPermission functionalAdmin
**/
exports.listCorporateAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    req.query = getActiveOnly(req);
    const data = await User.find({type: CORPORATE_ADMIN ,deleted : false});
    apiJson({ req, res, data , model: User });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};


/**
 * Delete user
 * @public
 */
exports.remove = (req: Request, res: Response, next: NextFunction) => {
  const { userFinded } = req.route.meta;
  userFinded
    .delete()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e: any) => next(e));
};

/**
 * Get available functional admin
 * @public
 * @example GET available functional admin
 */
exports.listAvailableAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let filterList;
    startTimer({ req });
    const occuped_admins = await Corporate.find().lean();
    if (occuped_admins) {
      filterList = occuped_admins.map((item: any) => item.manager);
    }
    const available_admins = await User.find({ _id: { $nin: filterList || [] }, type: FUNCTIONAL_ADMIN ,deleted : false});
    apiJson({ req, res, data: available_admins, model: User });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

/**
 * add user to role
 * @public
 */
exports.addRoleToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.userId;
    const { role } = req.body;
    const fetchedRole = await Role.findById(role);
    const fetchedUser = await User.findById(_id);
    if (fetchedRole && fetchedUser) {
      // update user collection with the new role
      const updatedUser = await User.findOneAndUpdate({ _id }, { role }, { new: true });
      res.json(updatedUser.transform());
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    return errorHandler(error, req, res);
  }
};
