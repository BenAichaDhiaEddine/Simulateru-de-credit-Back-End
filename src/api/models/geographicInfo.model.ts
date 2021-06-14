export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const mongoose_delete = require('mongoose-delete');
const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';
const APIError = require('api/utils/APIError');


const geographiqueInfoSchema = new mongoose.Schema({
  longitude: {
    required: true,
    type: String,
    // unique: true
  },
  latitude: {
    type: String,
    required: true,
     // unique: true
  },
  
},
  {
    timestamps: true
  }
);

const ALLOWED_FIELDS = ['id', 'longitude', 'latitude', 'deleted'];


/**
 * Methods
 */

geographiqueInfoSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  },
});

/**
 * Statics
 */
geographiqueInfoSchema.statics = {
  /**
   * Get geographiqueInfo
   * @param {ObjectId} id - The objectId of geographiqueInfo.
   * @returns {Promise<GeographiqueInfo, APIError>}
   */
  async get(id: any) {
    try {
      let geographiqueInfo;

      if (mongoose.Types.ObjectId.isValid(id)) {
        geographiqueInfo = await this.findById(id).exec();
      }
      if (geographiqueInfo) {
        return geographiqueInfo;
      }

      throw new APIError({
        message: 'GeographiqueInfo does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List geographiqueInfos.
   * @returns {Promise<GeographiqueInfo[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  },
}


/**
 * @typedef GeographiqueInfo
 */
geographiqueInfoSchema.plugin(mongoose_delete, { deletedAt: true });
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'fr' });
const GeographiqueInfo = mongoose.model('GeographiqueInfo', geographiqueInfoSchema);
GeographiqueInfo.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = GeographiqueInfo;
