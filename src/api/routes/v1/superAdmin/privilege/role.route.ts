export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/superAdmin/privilege/role.controller');
const { create } = require('api/validations/privilege/role.validation');


// Middleware
const { authorize } = require('api/middlewares/auth');

//const
import { SUPER_ADMIN } from 'api/utils/Const';

const router = express.Router();

/**
 * Load role when API with roleId route parameter is hit
 */
router.param('roleId', controller.load);


router.route('/')
  /**
   * {post}  /v1/superAdmin/privilege/role => Create Role
   */
  .post(validate(create), controller.create)
  /**
   * {get}  /v1/superAdmin/privilege/role => Roles list
   */
  .get(authorize([SUPER_ADMIN]), controller.list);

router.route('/:roleId')
  /**
  * {get}  /v1/superAdmin/privilege/role/:roleId => get role
  */
  .get(controller.retrive)
  /**
   * {delete}  /v1/superAdmin/privilege/role/:roleId => Delete role
   */
  .delete(controller.remove)

module.exports = router;
