export {};
const mongoose = require('mongoose');

/**
 * Citizen Schema
 * @private
 */

const citizenSchema = new mongoose.Schema(
  {
    corporate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Corporate',
      required: true
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true
  }
);

const ALLOWED_FIELDS = ['id', 'user', 'corporate'];

/**
 * @typedef Citizen
 */
const Citizen = mongoose.model('Citizen', citizenSchema);
Citizen.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Citizen;
