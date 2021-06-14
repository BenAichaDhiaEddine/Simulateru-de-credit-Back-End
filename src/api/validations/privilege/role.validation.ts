export { };
import * as Joi from 'joi';

const postPutRoleBody = () => {
  return {
    name: Joi.object({
      ar: Joi.string().max(128).required(),
    })
      .required(),
    slug: Joi.string()
      .regex(/^[a-z0-9-]+$/)
      .required(),
    permission: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .required(),
    corporate: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .required()
  };
};

module.exports = {
  // POST /v1/superAdmin/privilege/role 
  create: {
    body: postPutRoleBody()
  },
  // GET /v1/superAdmin/privilege/role
  list: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.object(),
      description: Joi.string(),
      slug: Joi.string()
        .regex(/^[a-z0-9-]+$/)
    }
  }
};
