export { };
import * as Joi from 'joi';

const postPutBody = () => {
  return {
    name: Joi.object()
      .required(),
    description: Joi.object()
      .required(),  
      credit: Joi.string()
      .required(),
  
  };
};

module.exports = {
  // GET /v1/functionalAdmin/getConditionInfo
  list: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.object(),
      credit: Joi.string(),
      enabled: Joi.boolean()
    }
  },

  // POST /v1/functionalAdmin/condition/addrConditionInfo
   create: {
    body: postPutBody()
  },

  // PUT /v1/functionalAdmin/condition/:id
  update: {
    body: {
      name:
        Joi.optional()
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