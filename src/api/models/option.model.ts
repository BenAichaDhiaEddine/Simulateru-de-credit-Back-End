export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl')
const mongoose_delete = require('mongoose-delete');
const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';

const APIError = require('api/utils/APIError');

const optionSchema = new mongoose.Schema({
  nameOption : {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  name: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RequestConfigInfo',
    required: false
  }
},
{
  timestamps: true
});


const ALLOWED_FIELDS = [
  'id',
  'nameOption',
  'description',
  'name'
];

// Populate ref attribut every time
optionSchema.pre(/^find/, function () {
  this.populate(' RequestConfig');
})


/**
 * Methods

  /**
* Get corporateConfig
   * @param {ObjectId} id - The objectId of corporateConfig.
   * @returns {Promise<Option, APIError>}
   */
optionSchema.statics = {

  async get(id: any) {
    try {
      let option;
      if (mongoose.Types.ObjectId.isValid(id)) {
        option = await this.findById(id).exec();
      }
      if (option) {
        return option;
      }

      throw new APIError({
        message: 'Option does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
   /**
   * List option.
   * @returns {Promise<Option[]>}
   */
    list({ query }: { query: any }) {
      return listData(this, query, ALLOWED_FIELDS);
    }
  };
  
  /**
   * @typedef Option
   */
  mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
  optionSchema.plugin(mongoose_delete, { deletedAt: true });
  const Option = mongoose.model('Option', optionSchema);
  Option.ALLOWED_FIELDS = ALLOWED_FIELDS;

  module.exports = Option;