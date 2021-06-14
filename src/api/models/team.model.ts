export { };
const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl')

const { NOT_FOUND } = require('http-status');
import { listData, transformData } from 'api/utils/ModelUtils';

const APIError = require('api/utils/APIError');

/**
 * Team Schema
 * @private
 */
const teamSchema = new mongoose.Schema({
  creditType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreditType',
    required: true
  },
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],
  isEnabled: {
    type: Boolean,
    default: true
  },
  corporate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Corporate',
    required: true
  },

});

const ALLOWED_FIELDS = ['id', 'creditType', 'teamLeader', 'members', 'isEnabled', 'corporate'];

// Populate ref attribut every time
teamSchema.pre(/^find/, function () {
  this.populate('creditType teamLeader members corporate');
});
teamSchema.post(/^save/, function () {
  this.populate('creditType teamLeader members corporate');
});


/**
 * Methods
 */

teamSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  }
});

/**
 * Statics
 */
teamSchema.statics = {

  /**
   * Get team
   * @param {ObjectId} id - The objectId of team.
   * @returns {Promise<Team, APIError>}
   */
  async get(id: any) {
    try {
      let team;

      if (mongoose.Types.ObjectId.isValid(id)) {
        team = await this.findById(id).exec();
      }
      if (team) {
        return team;
      }

      throw new APIError({
        message: 'Team does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
  * Get team
  * @param {ObjectId} id - The creditTypeId.
  * @returns {Promise<Team, APIError>}
  */
  async getByCategoryId(id: any) {
    try {
      let team;

      if (mongoose.Types.ObjectId.isValid(id)) {
        team = await this.findOne({ creditType: id }).exec();
      }
      if (team) {
        return team;
      }

      return null
    } catch (error) {
      throw error;
    }
  },
  /**
   * List team.
   * @returns {Promise<Team[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  }
};

/**
 * @typedef Team
 */
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
const Team = mongoose.model('Team', teamSchema);
Team.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Team;
