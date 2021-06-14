import { NextFunction, Request, Response } from "express";
import { Step } from "api/models";
const { handler: errorHandler } = require("api/middlewares/error");
import { startTimer, apiJson, getActiveOnly } from 'api/utils/Utils';
const httpStatus = require('http-status');
const { omit, pick } = require('lodash');

/**
* update a Step
* @functional_admin
*/
exports.putStep = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    let cid = req.params.cid;
    const stepfinded = await Step.findOne({ cid: cid });
    const newStep = new Step({ cid: cid, task_data: req.body.task_data });
    const newUserObject = omit(newStep.toObject(), '_id');
    await stepfinded.update(newUserObject, { override: true, upsert: true });
    const savedStep = await Step.findOne({ cid: cid });
    res.json(savedStep);
  }
  catch (error) {
    return errorHandler(error, req, res);
  }
}
/**
* get a Step
* @functional_admin
*/
exports.getStep = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    let cid = req.params.cid;
    const data = await Step.findOne({ cid: cid })
    res.json(data.task_data)
    next()
  } catch (error) {
    return errorHandler(error, req, res);
  };
}

/**
* delete a Step
* @functional_admin
*/
exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  startTimer({ req });
  let cid = req.params.cid;
  const step = await Step.findOne({ cid: cid })
  step.delete()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e: any) => next(e));
};

/**
* Create new Step
* @functional_admin
*/
exports.createOrGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    //find the step
    let cid = req.params.cid;
    const data = await Step.findOne({ cid: cid })
    console.log(data)
    //if Step exist 
      if(data){
      res.json(data)
    }
    //if Step doesnt exist create it 
    if (!data) {
      const StepOne = new Step({ cid: cid, task_data: [] });
      const savedStep = await StepOne.save();
      res.json(savedStep);
    }
    next()
  } catch (error) {
    console.log(error)
  }
};
