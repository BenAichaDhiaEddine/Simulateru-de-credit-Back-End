export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status')
const { omit } = require('lodash');
import { RequestConfig , CreditType } from 'api/models';
import { startTimer, apiJson ,getActiveOnly} from 'api/utils/Utils';
import { reach } from 'joi';
import { FUNCTIONAL_ADMIN } from '../../../utils/Const';
const { pick } = require('lodash');
const { handler: errorHandler } = require('api/middlewares/error');

/**
 * Load requestConfig and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const requestConfig = await RequestConfig.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.requestConfig = requestConfig;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};
/**
 * Retrieve credit
 * @public
 */
exports.retrieve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
        const { credit } = req.route.meta.requestConfig;
        res.status(200).json(credit);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
* @apiName Create new request
* @apiPermission functionalAdmin
*/
exports.create = async (req: any, res: Response, next: NextFunction) => {
  try {
  const { body } = req;
  const requestConfig = new RequestConfig({...body})
  const savedRequestConfig = await requestConfig.save()
  res.status(httpStatus.CREATED)
  res.json(savedRequestConfig.toJSON());
} catch (error) {
  return errorHandler(error, res, res)
}
}
/**
 * Retrieve credit
 * @public
 */
  exports.retrieve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
        const { requestConfig } = req.route.meta;
        res.status(200).json(requestConfig);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};


/**
* @api {get} /requestConfig get all credits
* @apiPermission functionalAdmin
**/
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req })
    // req.query.corporate = req.route.meta.user.role?.corporate;    
    const data = (await CreditType.list(req)).transform(req)
    
    apiJson({ req, res, data, model: CreditType })
    res.status(httpStatus.OK)
    
  } catch (error) {
    return errorHandler(error, req, res)
  
  }
}



/**
 * Get requestConfig list
 * @public
 */
 exports.listAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = (await RequestConfig.find({creditType:{$ne:null} ,deleted:false},))
    apiJson({ req, res, data, model: CreditType })
    res.status(httpStatus.OK)
  } catch (error) {
    return errorHandler(error, req, res)
  }
  };
  


/**
* @api {put} /requestConfig/:id update a  request 
* @apiPermission functional Admin
**/
exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestConfig = req.route.meta.requestConfig
    let updatedRC = Object.assign(requestConfig, req.body)

    updatedRC
      .save()
      .then((updatedRequestConfig: any) => res.json(updatedRequestConfig))
      .catch((error: any) => next(error))
  } catch (error) {
    return errorHandler(error, req, res)
  }
};


/**
* @api {delete} /requestConfig/:id delete a  credit type
* @apiPermission functional admin
**/

exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { requestConfig }  = req.route.meta ;
    await requestConfig
      .delete()
      .then(() => res.status(httpStatus.OK).end())
      .catch((error: any) => errorHandler(error, req, res));
  } catch(error){
    return errorHandler(error, req, res)
  }
};