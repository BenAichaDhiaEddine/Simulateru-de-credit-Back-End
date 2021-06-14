export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status')
const { omit } = require('lodash');
import { Condition, RequestConfig } from 'api/models';
import { startTimer, apiJson ,getActiveOnly} from 'api/utils/Utils';
import { description, reach } from 'joi';
import { FUNCTIONAL_ADMIN } from '../../../utils/Const';
const { pick } = require('lodash');
const { handler: errorHandler } = require('api/middlewares/error');

/**
 * Load condition and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const condition = await Condition.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.condition = condition;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};


/**
* @apiName Create new condition
* @apiPermission functionalAdmin
*/
exports.create = async (req: any, res: Response, next: NextFunction) => {


  try {
  const { body } = req;
 const condition = new Condition({nameCondition: body.nameCondition, description: body.description});
 const savedCondition = await condition.save()
 const findedReqConfig = await  RequestConfig.findOne({_id :  body.IdRequest});
  
 findedReqConfig.condition.push(savedCondition._id);

 await findedReqConfig.save()
 
 res.status(httpStatus.CREATED).json(savedCondition);
 
} 

  catch (error) {
  return errorHandler(error, res, res)
}
}

/**
// * @api {get} /get all conditions
// * @apiPermission functionalAdmin
// **/
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req })

       
    const data = await Condition.find({deleted : false})
    apiJson({ req, res, data, model: Condition })
    res.status(httpStatus.OK)
  } catch (error) {
    return errorHandler(error, req, res)
  
  }
}



/**
 * Get condition list
 * @public
 */
 exports.listAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = (await Condition.find({RequestConfig:{$ne:null} ,deleted:false}))
  
    apiJson({ req, res, data })
    res.status(httpStatus.OK)
  
    
  } catch (error) {
    return errorHandler(error, req, res)
  }
  };

  
  


/**
* @api {put} /condition/:id update a  request 
* @apiPermission functional Admin
**/
exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const condition = req.route.meta.condition
   
    const updatedC = Object.assign(condition,req.body)
     
    updatedC
      .save()
      .then((updatedCondition: any) => res.json(updatedCondition))
      .catch((error: any) => next(error))
  } catch (error) {
        return errorHandler(error, req, res)
  }
};


/**
* @api {delete} /condition/:id delete a condition
* @apiPermission functional admin
**/

exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { condition }  = req.route.meta ;
    const requestConfig = await RequestConfig.findOne({condition:condition._id})
    
    
      await RequestConfig.findOneAndUpdate({ _id: requestConfig._id }, { $pull: { condition: condition._id } });
      await condition
      .delete()
      .then(() => res.status(httpStatus.OK).end())
      .catch((error: any) => errorHandler(error, req, res))
         
  } catch(error){
    return errorHandler(error, req, res)
  }
};