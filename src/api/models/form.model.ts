
export { };
import { listData, transformData } from 'api/utils/ModelUtils';

const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const mongooseIntl = require('mongoose-intl');
const { NOT_FOUND } = require('http-status');
const APIError = require('api/utils/APIError');
const formSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    name: {
      type: String
    },

    description: {
      type: String,
      default: ""
    },

    sections: [{
      stepNbr: {
        type: Number
      },
      sectionName: {
        type: String
      },
      task_data: []
    }],



    stared: { type: Boolean, default: false },

  },
  {
    timestamps: true,
  }
);
const ALLOWED_FIELDS = ['id', 'createdBy', 'name', 'description', 'sections'];

formSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  },
});

formSchema.statics = {

  /**
   * Get corporateConfig
   * @param {ObjectId} id - The objectId of corporateConfig.
   * @returns {Promise<CorporateConfig, APIError>}
   */
  async get(id: any) {
    try {
      let form;

      if (mongoose.Types.ObjectId.isValid(id)) {
        form = await this.findById(id).exec();
      }
      if (form) {
        return form;
      }

      throw new APIError({
        message: 'Form does not exist',
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
* @typedef Form
*/
formSchema.plugin(mongoose_delete, { deletedAt: true });
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'fr' });
const Form = mongoose.model("Form", formSchema);
Form.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Form;
