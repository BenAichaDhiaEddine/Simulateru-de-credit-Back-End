export { };
import * as Joi from 'joi';

module.exports = {
  // GET /v1/superAdmin/corporateConfig
  list: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100)
    }
  },
  // PATCH /v1/superAdmin/corporateConfig/:corporateConfigId
  update: {
    body: {
      phone: Joi.string()
        .optional()
        .allow(''),
      fax: Joi.string()
        .optional()
        .allow(''),
      email: Joi.string()
        .email()
        .optional()
        .allow(''),
      website: Joi.string()
        .optional()
        .allow('')
        .max(128),
      features: Joi.array()
        .items(Joi.string()
          .regex(/^[a-fA-F0-9]{24}$/)
        ),
      street: Joi.string()
        .min(3)
        .max(128)
        .optional(),
      number: Joi.string()
        .alphanum()
        .max(20)
        .optional(),
      codePostal: Joi.string()
        .alphanum()
        .max(10)
        .optional()
        .allow(''),
      sftpServerConfig: Joi.object({
        name: Joi.string()
          .min(3)
          .max(128)
          .required(),
        ip: Joi.string()
          .ip()
          .required(),
        port: Joi.string()
          .alphanum()
          .length(4)
          .required(),
        password: Joi.string()
          .required()
      }),
      geography: Joi.object({
        latitude: Joi.string()
          .min(3)
          .max(128)
          .required(),
        longitude: Joi.string()
          .min(3)
          .max(128)
          .required(),
        polygon: Joi.string()
          .required(),
      })
    }
  },
  retrieve: {
    params: {
      corporateConfigId: Joi.string()
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
