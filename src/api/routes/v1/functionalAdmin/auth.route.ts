export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/functionalAdmin/auth.controller');
const userController = require('api/controllers/user.controller');

// validation
const { login, refresh, forgotPassword } = require('api/validations/auth.validation');
const { createUser } = require('api/validations/user.validation');
const { updateCurrentUser } = require('api/validations/user.validation');

// Middleware
const { authorize } = require('api/middlewares/auth');

// Const
const { FUNCTIONAL_ADMIN, CORPORATE_ADMIN } = require('../../../utils/Const')

const router = express.Router();


/**
 * {post} v1/admin/auth/login => Login
 */
router.route('/login').post(validate(login), controller.login);

/**
 * {post} v1/admin/auth/refresh-token => Refresh Token
 */
router.route('/refresh-token').post(validate(refresh), controller.refresh);


/**
 * {post}  /v1/admin/auth/register-employee => create admin
 */
router.route('/register-employee').post(validate(createUser), authorize([FUNCTIONAL_ADMIN]), userController.create(CORPORATE_ADMIN));

/**
 * {post} v1/admin/auth/forgot-password => Forget Password
 */
router.route('/forgot-password').post(validate(forgotPassword), controller.forgotPassword);

/**
 * {put} v1/admin/auth/updateMe => Update current user
 */
router.route('/updateMe').put(validate(updateCurrentUser), authorize([FUNCTIONAL_ADMIN]), userController.update(FUNCTIONAL_ADMIN));

module.exports = router;