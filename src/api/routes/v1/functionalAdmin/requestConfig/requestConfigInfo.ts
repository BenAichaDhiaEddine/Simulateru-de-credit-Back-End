export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/functionalAdmin/RequestConfig/requestConfigInfo.controller');
const controllerOption = require('api/controllers/functionalAdmin/RequestConfig/option.controller');
const controllerCondition = require('api/controllers/functionalAdmin/requestConfig/condition.controller');
const { createRequestConfig ,list, update ,remove} = require('api/validations/requestConfigInfo.validation')
const { upload } = require('api/middlewares/upload');

const router = express.Router();

// Middleware
const { authorize } = require('api/middlewares/auth');
const { can } = require('api/middlewares/can')

// const
import { FUNCTIONAL_ADMIN } from 'api/utils/Const';

/**
 * Load requestConfig 
 */
router.param('id', controller.load);


router.route('/addOption/:id')
/**
   * {post}  /v1/functionalAdmin/requestConfig/options/addOption => Create option
   */
.post(authorize([FUNCTIONAL_ADMIN]),controllerOption.create);



router.route('/addCondition/:id')
/**
   * {post}  /v1/functionalAdmin/requestConfig/conditions/addCondition => Create condition
   */
.post(authorize([FUNCTIONAL_ADMIN]),controllerCondition.create);


router.route('/getcreditType')
/**
   * @api {get}/v1/functionalAdmin/requestConfig/getcreditType  - retreive creditType by functionalAdmin
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
 .get(/*validate(list),*/controller.list);  



  router.route('/addrequestConfigInfo')
 /**
    * {post}  /v1/functionalAdmin/requestConfig/addRequestConfigInfo => Create requestConfig
    */
  .post(authorize([FUNCTIONAL_ADMIN]),controller.create);


router.route('/getRequestConfigInfo')
  /**
   * @api {get}/v1/functionalAdmin/requestConfig/getRequestConfigInfo - retreive requestConfig by functionalAdmin
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .get(controller.listAll);


  router.route('/:id')
  /**
   * @api{put}  /v1/FunctionalAdmin/requestConfig/:id  - change requestConfig status
   * @apiHeader {String} Athorization  functional admin's access token
   */
  .get(controller.retrieve)
  /**
   * @api {delete}  /v1/FunctionalAdmin/requestConfig/:id  -delete requestConfig
   * @apiHeader {String} Athorization  functional's access token
   */

  .delete(authorize([FUNCTIONAL_ADMIN]),validate(remove),controller.remove);


module.exports = router;