export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status')

const generator = require('generate-password');
const { pick } = require('lodash');
import { User, Corporate, Team } from 'api/models';
import { CORPORATE_ADMIN } from 'api/utils/Const';

const { handler: errorHandler } = require('api/middlewares/error');
import { apiJson, startTimer, getActiveOnly  } from 'api/utils/Utils'

/**
 * Load corporate and append to req.
 * @apiPermission admin
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const corporate = await Corporate.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.corporate = corporate;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Add employee to a given corporate
 * @public
 */
exports.addNewAdminCorporate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { AdminCorporate } = req.body;
    const corporate = await Corporate.findOne({ manager: req.route.meta.user._id });
if (corporate) {
  const type = CORPORATE_ADMIN;
  const password = generator.generate({
    length: 10,
    numbers: true
  });
  // Create user account for employee
  const user = new User({ ...AdminCorporate,  type ,password});

  //Add employee with given userId and corporateId
  const employee = new User({ corporate: corporate._id, user: user._id });  /// this was employee !!!!!!!!!!!!!!

  // Add employeeId to corporate employees
  corporate.employees.push(employee._id);

  const saveCorporate = await user.save();
  return res.json(saveCorporate.transform());
}
  } catch (error) {
    return errorHandler(error, req, res);
  }
};





/**
 * 
* @api {get} /corporate/:id retreive a corporate
* @apiPermission admin
**/

exports.retreive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req })
    const data = req.route.meta.corporate.transform()
    apiJson({ req, res, data, model: Corporate })
    res.status(httpStatus.OK)
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

/**
* @api {get} /corporate/members retreive a corporate
* @apiPermission admin
**/

exports.retreiveAllMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req })
    let data: any;
    const corporate = await Corporate.findOne({ manager: req.route.meta.user._id }).populate('employees');
    if (corporate) {
      data = corporate.employees;
    }
    apiJson({ req, res, data, model: Corporate })
    res.status(httpStatus.OK)
  } catch (error) {
    return errorHandler(error, req, res)
  }
}