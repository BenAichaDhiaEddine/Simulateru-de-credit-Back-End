export {};
import { NextFunction } from "express";
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jwt-simple");
const uuidv4 = require("uuid/v4");
const APIError = require("../../api/utils/APIError");
const mongooseIntl = require("mongoose-intl");
const {
  env,
  JWT_SECRET,
  JWT_EXPIRATION_MINUTES,
} = require("../../config/vars");

/**
 * Client gender
 */

const gender = ["homme", "femme","undefined"];
/**
 * Client Schema
 * @private
 */

const ClientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      validate: {
        validator: async function(email : any ) {
          const user = await this.constructor.findOne({ email });
          if(user) {
            if(this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        }
      },
      trim: true,
      lowercase: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    firstName: {
      type: String,
      maxlength: 128,
      required: true,
      trim: true
       },
    lastName: {
      type: String,
      maxlength: 128,
      trim: true,
      required: true,
    },
    file: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    age: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ClientSchema.pre("save", async function save(next: NextFunction) {
  try {
    // modifying password => encrypt it:
    const rounds = env === "development" ? 1 : 10;
    if (this.isModified("password")) {
      const hash = await bcrypt.hash(this.password, rounds);
      this.password = hash;
    }
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});



ClientSchema.plugin(mongoose_delete, { deletedAt: true });
const Client = mongoose.model(
  "Client",
  ClientSchema
);
module.exports = Client;
