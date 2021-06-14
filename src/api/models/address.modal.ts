export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl')
const mongoose_delete = require('mongoose-delete');

const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';

const APIError = require('api/utils/APIError');

/**
 * address Schema
 * @private
 */
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  country: {
    type: String,
    default: 'Tunisia'
  },
    
});

const ALLOWED_FIELDS = ['id', 'street', 'city', 'state', 'postalCode', 'country'];

// Populate ref attribut every time
addressSchema.pre(/^find/, function () {
    this.populate('');
  });
  addressSchema.post(/^save/, function () {
    this.populate('');
  });


/**
 * Methods
 */

addressSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

/**
 * Statics
 */
addressSchema.statics = {

  /**
   * Get address
   * @param {ObjectId} id - The objectId of address.
   * @returns {Promise<Address, APIError>}
   */
  async get(id: any) {
    try {
      let address;
      if (mongoose.Types.ObjectId.isValid(id)) {
        address = await this.findById(id).exec();
      }
      if (address) {
        return address;
      }

      throw new APIError({
        message: 'address does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List address.
   * @returns {Promise<Address[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};

/**
 * @typedef Address
 */
addressSchema.plugin(mongoose_delete, { deletedAt: true });
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
const Address = mongoose.model('Address', addressSchema);
Address.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Address;
