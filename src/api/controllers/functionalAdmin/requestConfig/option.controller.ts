export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status')
const { omit } = require('lodash');
import { Option, RequestConfig } from 'api/models';
import { startTimer, apiJson ,getActiveOnly} from 'api/utils/Utils';
import { description, reach } from 'joi';
import { FUNCTIONAL_ADMIN } from '../../../utils/Const';
const { pick } = require('lodash');
const { handler: errorHandler } = require('api/middlewares/error');


/**
 * Load option and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const option = await Option.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.option = option;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
* @apiName Create new option
* @apiPermission functionalAdmin
*/
exports.create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const option = new Option({nameOption: body.nameOption, description: body.description});
    const savedOption = await option.save()
    const findedReqConfig = await  RequestConfig.findOne({_id :  body.IdRequest});

    findedReqConfig.options.push(savedOption);
    
    await findedReqConfig.save()
    
    res.status(httpStatus.CREATED).json(savedOption);

} catch (error) {
  return errorHandler(error, res, res)
}
}

/**
 * Get option list
 * @public
 */
exports.listOption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req })
    req.query = getActiveOnly(req);  
    const data = await Option.find({deleted : false});
    apiJson({ req, res, data, model: Option })
    res.status(httpStatus.OK)
  } catch (error) {
    return errorHandler(error, req, res)
  }
  };

/**
* @api {put} /option/:id update an option
* @apiPermission functional Admin
**/
exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const option = req.route.meta.option
    let updatedO = Object.assign(option, req.body)

    updatedO
      .save()
      .then((updatedOption: any) => res.json(updatedOption))
      .catch((error: any) => next(error))
  } catch (error) {
    return errorHandler(error, req, res)
  }
};

/**
* @api {delete} /options/:id delete a  option
* @apiPermission functional admin
**/
exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  options   = req.route.meta.option ;
    const requestConfig = await RequestConfig.findOne({options:options._id})
    
      await RequestConfig.findOneAndUpdate({ _id: requestConfig._id }, { $pull: { options: options._id } });
      await options
      .delete()
      .then(() => res.status(httpStatus.OK).end())
      .catch((error: any) => errorHandler(error, req, res))
  } catch(error){
    return errorHandler(error, req, res)
  }
};