export {};
const mongoose = require('mongoose');

const { NOT_FOUND , BAD_REQUEST } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';

const APIError = require('api/utils/APIError');

/**
 * Corporate Schema
 * @private
 */
const corporateSchema = new mongoose.Schema(
  {
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }],
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: false
    },
    config: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CorporateConfig',
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const ALLOWED_FIELDS = ['id', 'employees', 'manager', 'config'];

// Populate ref attribut every time
corporateSchema.pre(/^find/, function () {
  this.populate('employees')
    .populate({
      path: 'manager',
      populate: {
        path: 'user',
        select:"id firstName lastName email"
      }
    });
});


/**
 * Methods
 */

corporateSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

/**
 * Statics
 */
corporateSchema.statics = {

  /**
   * Get corporate
   * @param {ObjectId} id - The objectId of corporate.
   * @returns {Promise<Corporate, APIError>}
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
        message: 'Corporate does not exist',
        status: BAD_REQUEST
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List corporate.
   * @returns {Promise<Corporate[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};
/**
 * @typedef Corporate
 */
const Corporate = mongoose.model('Corporate', corporateSchema);
Corporate.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Corporate;
