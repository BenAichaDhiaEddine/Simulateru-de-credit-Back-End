export { }
import { NextFunction, Request, Response } from 'express'
const httpStatus = require('http-status')
import { CreditType } from 'api/models'
const { handler: errorHandler } = require('api/middlewares/error')
import { apiJson, startTimer } from 'api/utils/Utils'
import { copyFileFromTmpToPath } from '../../services/folderService'


/**
* @apiName load  creditType by id
* @apiPermission superAdmin
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const creditType = await CreditType.getById(id)
    req.route.meta = req.route.meta || {}
    req.route.meta.creditType = creditType
    return next()
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

/**
* @apiName Create new creditType
* @apiPermission superAdmin
*/

exports.create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const creditType = new CreditType({...body})
    if (req.file) creditType.iconPath = await copyFileFromTmpToPath(req.file, '/corporates/creditType');
    const savedCreditType = await creditType.save()
    res.status(httpStatus.CREATED)
    res.json(savedCreditType.transform())
  } catch (error) {
    return errorHandler(error, res, res)
  }
}

/**
* @api {get} /teamscategories get all teamscategories
* @apiPermission superAdmin
**/

exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req })
    const data = (await CreditType.list(req)).transform(req)
    apiJson({ req, res, data, model: CreditType })
    res.status(httpStatus.OK)
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

/**
* @api {patch} /teamscategories/:id update a  credit type
* @apiPermission superAdmin
**/
exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const creditType = req.route.meta.creditType
    let updatedTc = Object.assign(creditType, req.body)
    updatedTc
      .save()
      .then((updatedCreditType: any) => res.json(updatedCreditType.transform()))
      .catch((error: any) => next(error))
  } catch (error) {
    return errorHandler(error, req, res)
  }
};


/**
* @api {delete} /teamscategories/:id delete a  credit type
* @apiPermission superAdmin
**/

exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {creditType} = req.route.meta
    await creditType
      .delete()
      .then(() => res.status(httpStatus.OK).end())
      .catch((error: any) => errorHandler(error, req, res));
  } catch(error){
    return errorHandler(error, req, res)
  }
}
