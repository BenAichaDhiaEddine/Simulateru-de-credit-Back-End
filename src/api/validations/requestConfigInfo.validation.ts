export { };
import * as Joi from 'joi';


const postPutBody = () => {
  return {
    name: Joi.object()
      .required(),
 
    creditType: Joi.string()
      .required(),
      enabled: Joi.boolean()
      .required()
  };
};

module.exports = {
  // GET /v1/functionalAdmin/getrequestConfigInfo
  list: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.object(),
      creditType: Joi.string(),
      enabled: Joi.boolean()
    }
  },

  // POST /v1/functionalAdmin/requestConfig/addrequestConfigInfo
  createRequestConfig: {
    body: postPutBody()
  },

  // PUT /v1/functionalAdmin/requestConfig/:id
  update: {
    body: {
      name:
        Joi.optional(),
      creditType:Joi.string()
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