export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const mongoose_delete = require('mongoose-delete');
const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';
const APIError = require('api/utils/APIError');


const roleSchema = new mongoose.Schema({
  slug: {
    required: true,
    empty: false,
    type: String,
    trim: true,
    index: { unique: true },
    unique: true
  },
  name: {
    type: String,
    empty: false,
    intl: true,
    required: true,
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  },
  corporate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Corporate',
  }
},
  {
    timestamps: true
  }
);

const ALLOWED_FIELDS = ['id', 'name', 'permission', 'corporate', 'user', 'createdAt', 'updatedAt', 'deleted'];

// Populate ref attribut every time
roleSchema.pre(/^find/, function () {
  this.populate(['permission', 'corporate']); // don't add the user because user already populate the role it will give infinit loop
});

/**
 * Methods
 */

roleSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  },
});

/**
 * Statics
 */
roleSchema.statics = {
  /**
   * Get role
   * @param {ObjectId} id - The objectId of role.
   * @returns {Promise<Role, APIError>}
   */
  async get(id: any) {
    try {
      let role;

      if (mongoose.Types.ObjectId.isValid(id)) {
        role = await this.findById(id).exec();
      }
      if (role) {
        return role;
      }

      throw new APIError({
        message: 'Role does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List roles.
   * @returns {Promise<Role[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  },
}


/**
 * @typedef Role
 */
roleSchema.plugin(mongoose_delete, { deletedAt: true });
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
const Role = mongoose.model('Role', roleSchema);
Role.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Role;
