export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl')
const mongoose_delete = require('mongoose-delete');
const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';
import { object } from 'joi';

const APIError = require('api/utils/APIError');

const requestConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  condition: [{
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Condition',
  }],
  creditType: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreditType',
    required: true
  },
  enabled: {
    type: Boolean
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Option',
  }]
},
{
  timestamps: true
});


const ALLOWED_FIELDS = [
  'id',
  'name',
  'creditType',
  'condition',
  'enabled',
  'options'
];

// Populate ref attribut every time
requestConfigSchema.pre(/^find/, function () {
  this.populate('creditType options condition');
})


/**
 * Methods

  /**
* Get corporateConfig
   * @param {ObjectId} id - The objectId of corporateConfig.
   * @returns {Promise<RequestConfig, APIError>}
   */
requestConfigSchema.statics = {

  async get(id: any) {
    console.log("id ======>",id)
    try {
      let requestConfig;
      if (mongoose.Types.ObjectId.isValid(id)) {
        requestConfig = await this.findById(id).exec();
      }
      if (requestConfig) {
        return requestConfig;
      }

      throw new APIError({
        message: 'RequestConfig does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
    /**
   * List requestConfig.
   * @returns {Promise<RequestConfig[]>}
   */
    list({ query }: { query: any }) {
      return listData(this, query, ALLOWED_FIELDS);
    }
  };
  
  /**
   * @typedef RequestConfig
   */
  mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
  requestConfigSchema.plugin(mongoose_delete, { deletedAt: true });
  const RequestConfig = mongoose.model('RequestConfig', requestConfigSchema);
  RequestConfig.ALLOWED_FIELDS = ALLOWED_FIELDS;

  module.exports = RequestConfig;