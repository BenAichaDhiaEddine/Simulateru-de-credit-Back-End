export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/corporateAdmin/auth.controller');
const userController = require('api/controllers/user.controller');

// validation
const { login, refresh, forgotPassword } = require('api/validations/auth.validation');
const { updateCurrentUser } = require('api/validations/user.validation');

// Middleware
const { authorize } = require('api/middlewares/auth');

// Const
const { CORPORATE_ADMIN } = require('../../../utils/Const')

const router = express.Router();

/**
 * {post} v1/corporateAdmin/auth/login => Login
 */
router.route('/login').post(validate(login),controller.login);

/**
 * {post} v1/corporateAdmin/auth/refresh-token => Refresh Token
 */
router.route('/refresh-token').post(validate(refresh), controller.refresh);

/**
 * {post} v1/corporateAdmin/auth/forgot-password => Forget Password
 */
router.route('/forgot-password').post(validate(forgotPassword), controller.forgotPassword);

/**
 * {put} v1/corporateAdmin/auth/updateMe => Update current user
 */
router.route('/updateMe').put(validate(updateCurrentUser), authorize([CORPORATE_ADMIN]), userController.update(CORPORATE_ADMIN));

module.exports = router;
