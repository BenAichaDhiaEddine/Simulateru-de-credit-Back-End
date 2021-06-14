export { };
import * as Joi from 'joi';
import { User } from 'api/models';

const requireEmail = () =>
  Joi.string()
    .email()
    .required();

const postPutBody = () => {
  return {
    email: requireEmail(),
    name: Joi.string().max(128),
    // type: Joi.string().valid(User.type)
  };
};

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      email: Joi.string(),
      // type: Joi.string().valid(User.type)
    }
  },

  // POST /v1/users
  createUser: {
    body: postPutBody()
  },

  // PUT /v1/users/:userId
  replaceUser: {
    body: postPutBody(),
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      email: Joi.string().email(),
      password: Joi.string()
        .min(6)
        .max(128),
      name: Joi.string().max(128),
      // type: Joi.string().valid(User.type)
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PUT /v1/users/updateMe
  updateCurrentUser: {
    body: {
      email: Joi.string().email(),
      password: Joi.string()
        .min(6)
        .max(128),
      name: Joi.string().max(128),
      // type: Joi.string().valid(User.type)
    },
    req: {
      route: {
        meta: Joi.object()
          .required()
      }
    }
  },
  remove: {
    params: {
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};

