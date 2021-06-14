export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/functionalAdmin/requestConfig/condition.controller');
const { create , update ,remove} = require('api/validations/condition.validation');
const { upload } = require('api/middlewares/upload');

const router = express.Router();



// Middleware
const { authorize } = require('api/middlewares/auth');
const { can } = require('api/middlewares/can')

// const
import { FUNCTIONAL_ADMIN } from 'api/utils/Const';

/**
 * Load condition 
 */
router.param('id', controller.load);


 
 router.route('/condition/:id')
 /**
* @api{put}  //v1/functionalAdmin/requestConfig/conditions/:id  - change condition status
* @apiHeader {String} Athorization  functional admin's access token
*/
 .put(authorize([FUNCTIONAL_ADMIN]),controller.update)

 /**
* @api {delete}  /v1/functionalAdmin/requestConfig/conditions/:id  -delete condition
* @apiHeader {String} Athorization  functional's access token
*/

.delete(authorize([FUNCTIONAL_ADMIN]),controller.remove);

 
router.route('/getConditionInfo')
  /**
   * @api {get}/v1/functionalAdmin/condition/getConditionInfo - retreive condition by functionalAdmin
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .get(authorize([FUNCTIONAL_ADMIN]),controller.list);





module.exports = router;
