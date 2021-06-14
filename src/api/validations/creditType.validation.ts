export { };
import * as Joi from 'joi';
import { CreditType } from 'api/models';

const postPutBody = () => {
  return {
    name: Joi.object()
      .required(),
    description: Joi.string()
      .min(10)
      .required(),
    iconPath: Joi.string()
      .allow('').optional(),
    enabled: Joi.boolean()
      .required()
  };
};

module.exports = {
  // GET /v1/superAdmin/teamscategories
  list: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.object(),
      description: Joi.string(),
      iconPath: Joi.string(),
      enabled: Joi.boolean()
    }
  },

  // POST /v1/superAdmin/teamscategories
  create: {
    body: postPutBody()
  },

  // PATCH /v1/superadmin/teamscategories/:id
  update: {
    body: {
      name: Joi.string()
        .optional(),
      description: Joi.string()
        .min(10)
        .optional(),
      iconPath: Joi.string()
      .optional(),
      enabled: Joi.boolean()
    },
    params: {
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
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
