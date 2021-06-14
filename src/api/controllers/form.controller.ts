export { };
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status');
const { omit, pick } = require('lodash');
import { Form } from "api/models";
import { startTimer, apiJson, getActiveOnly } from 'api/utils/Utils';
const mongooseIntl = require('mongoose-intl');
//services
// import { copyFileFromTmpToPath } from 'api/services/folderService';

const { handler: errorHandler } = require('api/middlewares/error');

/**
 * Load  and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const form = await Form.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.form = form;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * @public
 */

exports.create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { body } = req;


    const newForm = {


      name: req.body.name,
      description: body.description,
      sections: [
        {
          task_data: [
            {
              // "id": "1CD2FB1F-A3C6-4835-BB10-A6F0F874B07D",
              element: "Header",
              text: "Header Text",
              static: true,
              required: false,
              bold: true,
              italic: false,
              content: `${req.body.name}`,
              canHavePageBreakBefore: true,
              canHaveAlternateForm: true,
              canHaveDisplayHorizontal: true,
              canHaveOptionCorrect: true,
              canHaveOptionValue: true,
              label: "<span style=\"font-size: 36px;\">Placeholder Label</span> ",
              canPopulateFromApi: true
            },
            {
              // id: "24D0F1C0-FCE9-4730-8ACD-03231F00EBD5",
              element: "LineBreak",
              text: "Line Break",
              static: true,
              required: false,
              bold: false,
              italic: false,
              canHavePageBreakBefore: true,
              canHaveAlternateForm: true,
              canHaveDisplayHorizontal: true,
              canHaveOptionCorrect: true,
              canHaveOptionValue: true,
              canPopulateFromApi: true
            },

          ],
          // _id: "608b447742bff40b90c7d223",
          stepNbr: 0,
          sectionName: "Step 1"
        }
      ]
    }

    let form = new Form(newForm);
    form = await form.save();
    res.json(form.toJSON());
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get  list
 * @public
 */
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    req.query = getActiveOnly(req);
    const data = (await Form.list(req)).transform(req);
    apiJson({ req, res, data, model: Form });
  } catch (e) {
    next(e);
  }
};
/**
 * Delete corporate config
 * @public
 */
exports.remove = (req: Request, res: Response, next: NextFunction) => {
  const { form } = req.route.meta;

  form
    .delete()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e: any) => next(e));
};


/**
 * Retrieve 
 * @public
 */
exports.retrieve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { form } = req.route.meta;
    res.json(form.toJSON());
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Update existing 
 * @public
 */
exports.update = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { form } = req.route.meta;
    const updatedForm = Object.assign(form, req.body);
    updatedForm
      .save()
      .then((savedForm: any) => res.json(savedForm.transform()))
      .catch((error: any) => errorHandler(error, req, res));

  } catch (error) {
    return errorHandler(error, req, res);
  }
};
