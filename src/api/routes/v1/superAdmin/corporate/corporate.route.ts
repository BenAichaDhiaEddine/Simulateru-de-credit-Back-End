
export {};
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/functionalAdmin/corporate/corporate.controller');
const cont = require('api/controllers/superAdmin/corporate/corporate.controller');

// Middleware
const { authorize } = require('api/middlewares/auth');

// Const
const { FUNCTIONAL_ADMIN } = require('../../../../utils/Const')

const router = express.Router();

/**
 * Load corporate when API with id route parameter is hit
 */
router.param('id', controller.load)

router.route('/members')
/**
   * @api {post}/v1/functionalAdmin/corporate/:id  - retreive corporate by id
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .get(authorize([FUNCTIONAL_ADMIN]),controller.retreiveAllMembers);

router.route('/:id')
/**
   * @api {post}/v1/functionalAdmin/corporate/:id  - retreive corporate by id
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .get(controller.retreive)

  router.route('/createCorporate')
  /**
     * @api {post}/v1/functionalAdmin/corporate/:id  - retreive corporate by id
     * @apiHeader {String} Athorization  functionalAdmin's access token
     */
    .post(cont.create)

router.route('/:id/members/add')
  /**
   * 
   * @api {post}/v1/functionalAdmin/corporate/:id/members/add  - add corporate employee
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
  .post(controller.addNewAdminCorporate)

module.exports = router