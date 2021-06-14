export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/functionalAdmin/corporate/corporateConfig.controller');
const { update } = require('api/validations/corporateConfig.validation');

const router = express.Router();

// Middleware
const { authorize } = require('api/middlewares/auth');
const { can } = require('api/middlewares/can')

//const
import { FUNCTIONAL_ADMIN } from 'api/utils/Const';

/**
 * Load corporate config when API with corporateConfigId route parameter is hit
 */
router.param('corporateConfigId', controller.load);


router.route('/')
  /**
   * @api {get}/v1/functionalAdmin/corporate-config  - retreive corporate by functionalAdmin
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .get(authorize([FUNCTIONAL_ADMIN]), /*can('read_corporateConfig'),*/ controller.retrieveMyCorporateConfig)
  /**
   * {put}/vs1/functionalAdmin/corporate-config/:corporateConfigId => Update corporateConfig by functionalAdmin
   */
  .put(authorize([FUNCTIONAL_ADMIN]), validate(update), controller.updateMyCorporateConfig);

router.route('/:corporateConfigId')
  
  /**
  * {get}  /v1/superAdmin/corporateConfig/:corporateConfigId => retrieve one corporateConfig
  * 
  *.get(authorize([SUPER_ADMIN]), validate(retrieve), controller.retrieve);
  */
module.exports = router;
