export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl')
const mongoose_delete = require('mongoose-delete');
const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';

const APIError = require('api/utils/APIError');

const corporateConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    intl: true,
    required: true
  },
  logo: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true,
    intl: true
  },
  phone: {
    type: String,
    required: false,
    default: ''
  },
  fax: {
    type: String,
    required: false,
    default: ''
  },
  email: {
    type: String,
    required: false,
    default: ''
  },
  website: {
    type: String,
    required: false,
    default: ''
  },
  state: {
    type: String,
    required: false,
    intl: true
  },
  customId: {
    type: String,
    required: false,
    default: ''
  },
  geography: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'GeographiqueInfo'
  },
  codePostal: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: false
  },
  street: {
    type: String,
    required: false
  },
  activated: {
    type: Boolean,
    default: true
  }
});

const ALLOWED_FIELDS = [
  'id',
  'name',
  'logo',
  'city',
  'phone',
  'fax',
  'website',
  'state',
  'email',
  'geography',
  'codePostal',
  'number',
  'street',
  'activated'
];

// Populate ref attribut every time
corporateConfigSchema.pre(/^find/, function () {
  this.populate('geography');
});


/**
 * Methods
 */

corporateConfigSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

/**
 * Statics
 */
corporateConfigSchema.statics = {

  /**
   * Get corporateConfig
   * @param {ObjectId} id - The objectId of corporateConfig.
   * @returns {Promise<CorporateConfig, APIError>}
   */
  async get(id: any) {
    try {
      let corporate;

      if (mongoose.Types.ObjectId.isValid(id)) {
        corporate = await this.findById(id).exec();
      }
      if (corporate) {
        return corporate;
      }

      throw new APIError({
        message: 'CorporateConfig does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List corporateConfig.
   * @returns {Promise<CorporateConfig[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};

/**
 * @typedef CorporateConfig
 */
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
const CorporateConfig = mongoose.model('CorporateConfig', corporateConfigSchema);
CorporateConfig.ALLOWED_FIELDS = ALLOWED_FIELDS;
corporateConfigSchema.plugin(mongoose_delete, { deletedAt: true });
module.exports = CorporateConfig;
