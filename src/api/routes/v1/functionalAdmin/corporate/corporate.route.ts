
export {};
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/functionalAdmin/corporate/corporate.controller');
const ControllerAdminCorporate = require('api/controllers/user.controller');


// Middleware
const { authorize } = require('api/middlewares/auth');
const { userValidation } = require('api/validations/user.validation');

// Const
const { FUNCTIONAL_ADMIN , CORPORATE_ADMIN } = require('../../../../utils/Const')

const router = express.Router();

/**
 * Load corporate when API with id route parameter is hit
 */
router.param('id', ControllerAdminCorporate.load)

router.route('/listCorporateAdmins')
/**
   * @api {post}/v1/functionalAdmin/corporate/listCorporateAdmins  - retreive corporate by id
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
 
.get(authorize([FUNCTIONAL_ADMIN]), ControllerAdminCorporate.listCorporateAdmins);


 // .get(authorize([FUNCTIONAL_ADMIN]),controller.retreiveAllMembers);

router.route('/:id')
/**
   * @api {post}/v1/functionalAdmin/corporate/:id  - retreive corporate by id
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  
  .put(authorize([FUNCTIONAL_ADMIN]), ControllerAdminCorporate.update)
  .delete(authorize([FUNCTIONAL_ADMIN]), ControllerAdminCorporate.remove);

router.route('/addAdminCorporate')
  /**
   * @api {post}/v1/functionalAdmin/corporate/listCorporateAdmins - add corporate admin
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .post(/*validate(userValidation), */authorize([FUNCTIONAL_ADMIN]), ControllerAdminCorporate.create(CORPORATE_ADMIN));



module.exports = router