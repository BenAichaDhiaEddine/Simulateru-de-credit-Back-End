export {};
const express = require('express');
const validate = require('express-validation');
const controller = require('api/controllers/superAdmin/auth.controller');
const { login,resetPassword } = require('api/validations/auth.validation');
const router = express.Router();
// Middleware
const { authorize } = require('api/middlewares/auth');

//const
import { SUPER_ADMIN } from 'api/utils/Const';

/**
 * {post}  /v1/superAdmin/auth/login => Login to superAdmin
 */
router.route('/login').post(validate(login), controller.login);

router.route('/reset-password').post(authorize([SUPER_ADMIN]),validate(resetPassword), controller.resetPassword);


module.exports = router;
