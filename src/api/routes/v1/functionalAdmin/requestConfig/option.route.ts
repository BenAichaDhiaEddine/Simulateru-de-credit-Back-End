export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/functionalAdmin/RequestConfig/option.controller');
const router = express.Router();

// Middleware
const { authorize } = require('api/middlewares/auth');
//const
import { FUNCTIONAL_ADMIN } from 'api/utils/Const';

/**
 * Load option 
 */
router.param('id', controller.load);

router.route('/listoption')
  /**
   * @api {get}/v1/functionalAdmin/requestConfig/options - retreive option by functionalAdmin
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .get(authorize([FUNCTIONAL_ADMIN]),controller.listOption);

  


  router.route('/option/:id')
  /**
 * @api{put}  //v1/functionalAdmin/requestConfig/options/:id  - change option status
 * @apiHeader {String} Athorization  functional admin's access token
 */
  .put(authorize([FUNCTIONAL_ADMIN]),controller.update)

  /**
 * @api {delete}  /v1/functionalAdmin/requestConfig/options/:id  -delete option
 * @apiHeader {String} Athorization  functional's access token
 */

.delete(authorize([FUNCTIONAL_ADMIN]),controller.remove);



module.exports = router;