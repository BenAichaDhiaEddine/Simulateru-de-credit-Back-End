export { };
const mongoose = require('mongoose');
import { listData, transformData } from 'api/utils/ModelUtils';
const APIError = require('api/utils/APIError');
const httpStatus = require('http-status');
const mongooseIntl = require('mongoose-intl')
const mongoose_delete = require('mongoose-delete');
const creditTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    intl: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false,
  },
  // customId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   dropDups: true
  // },
  enabled: {
    type: Boolean,
    required: true,
  }
},
  {
    timestamps: true
  }
);

const ALLOWED_FIELDS = ['id', 'name', 'description', 'customId', 'enabled', 'createdAt'];


/**
 * Methods
 */

creditTypeSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

creditTypeSchema.statics = {
  /**
   * Get CreditType by id
   * @param {ObjectId} id
   * @returns {Promise<Role, APIError>}
   */
  async getById(id: any) {
    try {
      let creditType;

      if (mongoose.Types.ObjectId.isValid(id)) {
        creditType = await this.findById(id).exec();
      }
      if (creditType)  return creditType

      throw new APIError({
        message: 'creditType does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List
   * @returns {Promise<CreditType[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
}


/**
 * @typedef CreditType
 */
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
creditTypeSchema.plugin(mongoose_delete, { deletedAt: true });
const CreditType = mongoose.model('CreditType', creditTypeSchema);
CreditType.ALLOWED_FIELDS = ALLOWED_FIELDS;

module.exports = CreditType;
