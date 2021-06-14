export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const mongoose_delete = require('mongoose-delete');
const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';

const APIError = require('api/utils/APIError');

/**
 * Permission Actions
 */
const permissionSchema = new mongoose.Schema({
  user: {
    create: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  corporateConfig: {
    create: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  creditTypes: {
    create: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  permissions: {
    create: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  }
},
  {
    timestamps: {
      type: Boolean,
      default: false
    }
  }
);


const ALLOWED_FIELDS = ['_id', 'user', 'corporate', 'permissions', 'corporateGeographies', 'deleted'];

// Populate ref attribut every time
permissionSchema.pre(/^find/, function () {
  // this.populate('');
});

/**
 * Methods
 */

permissionSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

/**
 * Statics
 */
permissionSchema.statics = {
  /**
   * Get permission
   * @param {ObjectId} id - The objectId of permission.
   * @returns {Promise<Permission, APIError>}
   */
  async get(id: any) {
    try {
      let permission;

      if (mongoose.Types.ObjectId.isValid(id)) {
        permission = await this.findById(id).exec();
      }
      if (permission) {
        return permission;
      }

      throw new APIError({
        message: 'Permission does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List permissions.
   * @returns {Promise<Permission[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};

/**
 * @typedef Permission
 */
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
permissionSchema.plugin(mongoose_delete, { deletedAt: true });
const Permission = mongoose.model('Permission', permissionSchema);
Permission.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Permission;
