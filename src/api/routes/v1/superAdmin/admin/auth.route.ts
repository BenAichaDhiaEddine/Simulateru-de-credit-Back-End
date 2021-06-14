export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/user.controller');
const { createUser, updateUser,remove } = require('api/validations/user.validation');

// Middleware
const { authorize } = require('api/middlewares/auth');

//const
const { FUNCTIONAL_ADMIN, SUPER_ADMIN } = require('api/utils/Const');

const router = express.Router();

/**
 * Load team category when API with id route parameter is hit
 */
 router.param('id', controller.load)
 
/**
 * {get}  /v1/superAdmin/admin/available-admins => get available admins
 */
router.route('/available-admins').get(authorize([SUPER_ADMIN]), controller.listAvailableAdmins);

/**
 * {get}  /v1/superAdmin/admin/get-admins => get admins
 */
 router.route('/get-admins').get(authorize([SUPER_ADMIN]), controller.list);

/**
 * {post}  /v1/superAdmin/admin/register => create admin
 */
router.route('/register').post(validate(createUser), authorize([SUPER_ADMIN]), controller.create(FUNCTIONAL_ADMIN));

/**
 * {put}  /v1/superAdmin/admin/:adminId/role => update admin role
 */
router.route('/:userId/role').put(authorize([SUPER_ADMIN, FUNCTIONAL_ADMIN]), controller.updateRole(FUNCTIONAL_ADMIN))

/**
 * {put}  /v1/superAdmin/admin/:adminId => update admin
 */
router.route('/:userId').put(validate(updateUser),authorize([SUPER_ADMIN]), controller.update(FUNCTIONAL_ADMIN));

/**
 * {delete}  /v1/superAdmin/admin/:adminId => delete admin
 */

router.route('/:id')

.delete(authorize([SUPER_ADMIN]),validate(remove), controller.remove);



module.exports = router;
