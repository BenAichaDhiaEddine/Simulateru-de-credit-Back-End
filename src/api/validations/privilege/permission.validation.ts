export { };
import * as Joi from 'joi';

module.exports = {
  // GET /v1/superAdmin/privilege/permission
  list: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100)
    }
  },
  // POST /v1/superAdmin/privilege/permission
  create: {
    body: {
      user: Joi.object({
        create: Joi.boolean().required(),
        read: Joi.boolean().required(),
        update: Joi.boolean().required(),
        delete: Joi.boolean().required()
      }).required(),
      corporateConfig: Joi.object({
        create: Joi.boolean().required(),
        read: Joi.boolean().required(),
        update: Joi.boolean().required(),
        delete: Joi.boolean().required()
      }).required(),
      sftpServerConfigs: Joi.object({
        create: Joi.boolean().required(),
        read: Joi.boolean().required(),
        update: Joi.boolean().required(),
        delete: Joi.boolean().required()
      }).required(),
      creditTypes: Joi.object({
        create: Joi.boolean().required(),
        read: Joi.boolean().required(),
        update: Joi.boolean().required(),
        delete: Joi.boolean().required()
      }).required(),
      permissions: Joi.object({
        create: Joi.boolean().required(),
        read: Joi.boolean().required(),
        update: Joi.boolean().required(),
        delete: Joi.boolean().required()
      }).required(),
    }
  },
  retrieve: {
    params: {
      permissionId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
