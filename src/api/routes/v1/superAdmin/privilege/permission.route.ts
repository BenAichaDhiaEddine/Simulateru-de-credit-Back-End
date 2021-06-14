export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/superAdmin/privilege/permission.controller');
const { create } = require('api/validations/privilege/permission.validation');

const router = express.Router();

/**
 * Load permission when API with permissionId route parameter is hit
 */
router.param('permissionId', controller.load);

router.route('/')
  /**
   * {post}  /v1/superAdmin/privilege/permission => Create Permission
   */
  .post(validate(create), controller.create)
  /**
   * {get}  /v1/superAdmin/privilege/permission => Permission list
   */
  .get( controller.list);

router.route('/:permissionId')
  /**
  * {get}  /v1/superAdmin/privilege/permission/:permissionId => get permission
  */
  .get(controller.retrive)
  /**
   * {delete}  /v1/superAdmin/privilege/permission/:permissionId => Delete permission
   */
  .delete(controller.remove)

module.exports = router;
