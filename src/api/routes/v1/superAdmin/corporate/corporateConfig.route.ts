export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/superAdmin/corporate/corporateConfig.controller');
const { update,retrieve , remove } = require('api/validations/corporateConfig.validation');

const router = express.Router();

// Middleware
const { authorize } = require('api/middlewares/auth');
const { can } = require('api/middlewares/can')

//const
import { SUPER_ADMIN } from 'api/utils/Const';
import { upload } from '../../../../middlewares/upload';

/**
 * Load corporate config when API with corporateConfigId route parameter is hit
 */
router.param('corporateConfigId', controller.load);


router.route('/')
  /**
   * @api {get}/v1/superAdmin/corporate-config  - retreive corporate by superAdmin
   * @apiHeader {String} Athorization  superAdmin's access token
   */
  .get(controller.list);

  router.route('/addCorporateConfig')
  /**
   * @api {post}/v1/superAdmin/corporate-config/addCorporateConfig  - add corporate by superAdmin
   * @apiHeader {String} Athorization  superAdmin's access token
   */
  .post(authorize([SUPER_ADMIN]),upload.single("logo"), controller.create);


router.route('/:corporateConfigId')
  /**
   * {put}/v1/superAdmin/corporate-config/:corporateConfigId => Update corporateConfig by superAdmin
   */
  .put(authorize([SUPER_ADMIN]), controller.update)
  .get(authorize([SUPER_ADMIN]),validate(retrieve), controller.retrieve)
  /*
 * {delete}  /v1/superAdmin/admin/:adminId => delete admin
 */

  .delete(authorize([SUPER_ADMIN]), controller.remove);
 


  /**
  * {get}  /v1/superAdmin/corporateConfig/:corporateConfigId => retrieve one corporateConfig
  * 
.get(authorize([SUPER_ADMIN]), validate(retrieve), controller.retrieve);
  */
module.exports = router;
