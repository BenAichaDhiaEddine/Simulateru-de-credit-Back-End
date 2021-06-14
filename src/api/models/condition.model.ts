export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl')
const mongoose_delete = require('mongoose-delete');
const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';
import { object } from 'joi';

const APIError = require('api/utils/APIError');

const conditionSchema = new mongoose.Schema({
  nameCondition: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
},
{
  timestamps: true
});


const ALLOWED_FIELDS = [
  'id',
  'nameCondition',
  'description'
];

// Populate ref attribut every time
conditionSchema.pre(/^find/, function () {
  this.populate('RequestConfig');
})


/**
 * Methods

  /**
* Get condition 
   * @param {ObjectId} id - The objectId of corporateConfig.
   * @returns {Promise<RequestConfig, APIError>}
   */
conditionSchema.statics = {

  async get(id: any) {
    try {
      let condition;
      if (mongoose.Types.ObjectId.isValid(id)) {
        condition = await this.findById(id).exec();
      }
      if (condition) {
        return condition;
      }

      throw new APIError({
        message: 'Condition does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
   /**
   * List condition.
   * @returns {Promise<Condition[]>}
   */
    list({ query }: { query: any }) {
      return listData(this, query, ALLOWED_FIELDS);
    }
  };
  
  /**
   * @typedef Condition
   */
  mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
  conditionSchema.plugin(mongoose_delete, { deletedAt: true });
  const Condition = mongoose.model('Condition', conditionSchema);
  Condition.ALLOWED_FIELDS = ALLOWED_FIELDS;

  module.exports = Condition;