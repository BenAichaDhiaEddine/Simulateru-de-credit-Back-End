export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status');

const { omit } = require('lodash');
import { Corporate, CorporateConfig,GeographiqueInfo } from 'api/models';
import { startTimer, apiJson ,getActiveOnly } from 'api/utils/Utils';
const mongooseIntl = require('mongoose-intl');
//services
import { copyFileFromTmpToPath } from 'api/services/folderService';

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
 * Create new corporatesConfig
 * @public
 */
exports.create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    let corporateConfig = new CorporateConfig({ ...body });
    if (req.file) corporateConfig.logo = await copyFileFromTmpToPath(req.file, '/corporates/logos');
    corporateConfig = await corporateConfig.save();
    res.json(corporateConfig.toJSON());
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get corporatesConfig list
 * @public
 */
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    req.query = getActiveOnly(req);
    const data = (await CorporateConfig.list(req)).transform(req);
    apiJson({ req, res, data, model: CorporateConfig });
  } catch (e) {
    next(e);
  }
};
/**
 * Delete corporate config
 * @public
 */
 exports.remove = (req: Request, res: Response, next: NextFunction) => {
  const {corporateConfig } = req.route.meta;
  corporateConfig
    .delete()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e: any) => next(e));
};


/**
 * Retrieve corporateConfig
 * @public
 */
exports.retrieve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { corporateConfig } = req.route.meta;
    res.json(corporateConfig.toJSON());
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Update existing corporateConfig
 * @public
 */
exports.update = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { corporateConfig } = req.route.meta;
    const {geography} = req.body;
    const omitReqBody = omit(req.body, ['address', 'geography', '_id', '__v']);
    const updatedCorporateConfig = Object.assign(corporateConfig, omitReqBody);

    if (req.file) {
      updatedCorporateConfig.logo = await copyFileFromTmpToPath(req.file, '/corporates/logos');
    }
    if (geography) {
      const geographyId = updatedCorporateConfig.geography && updatedCorporateConfig.geography._id;
      const updatedGeographyConfig = await createOrUpdateGeographyConfig(geographyId,geography);
      updatedCorporateConfig.geography=updatedGeographyConfig;

    }
    updatedCorporateConfig
      .save()
      .then((savedCorporateConfig: any) => res.json(savedCorporateConfig.transform()))
      .catch((error: any) => errorHandler(error, req, res));
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

const createOrUpdateGeographyConfig = async(geographyId: any , geographyConfig:any) =>{
try{
const options = {new:true}  ;
const updatedGeographyConfig = await GeographiqueInfo.findOneAndUpdate(
{_id:geographyId},
geographyConfig,
options
);
//if is a new geogaphy config...we create it.
if(!updatedGeographyConfig){
  const newGeographyConfig = new GeographiqueInfo(geographyConfig);
  const savedGeographyConfig = await newGeographyConfig.save();
  return savedGeographyConfig;
}
return updatedGeographyConfig;


}catch (error) {
  console.log(error);
}

 };