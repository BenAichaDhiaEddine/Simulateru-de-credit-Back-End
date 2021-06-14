export { };
const Joi = require('joi');
import { USER } from 'api/utils/Const';

module.exports = {
  // POST /v1/citizen/auth/register
  register: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
      phone: Joi.string()
        .required()
        .length(8),
      firstName: Joi.string()
        .max(128),
      lastName: Joi.string()
        .max(128),
      gender: Joi.string()
        .valid('male', 'female'),
      birthDay: Joi.date()
        .iso(),
      type: Joi.string()
        .valid(USER)
    }
  },

  // POST /v1/admin/auth/login
  // POST /v1/citizen/auth/login

  login: {
    body: {
      email: Joi.string()
        .email(),
      phone: Joi.string()
        .length(8),
      password: Joi.string()
        .required()
        .max(128)
    }
  },

  // POST /v1/citizen/auth/facebook
  // POST /v1/citizen/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required()
    }
  },

  // POST /v1/admin/auth/refresh
  // POST /v1/citizen/auth/refresh
  refresh: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      refreshToken: Joi.string().required()
    }
  },

  // POST /v1/admin/auth/forgot-password
  // POST /v1/citizen/auth/forgot-password
  forgotPassword: {
    body: {
      email: Joi.string()
        .email()
        .required()
    }
  },

  resetPassword: {
    body: {
      oldPassword: Joi.string()
        .required()
        .min(6)
        .max(128),
      newPassword: Joi.string()
        .required()
        .min(6)
        .max(128),
    }
  }
};
