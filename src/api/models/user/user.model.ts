export { };
import { NextFunction } from 'express';
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../../utils/APIError');
import { transformData, listData } from '../../utils/ModelUtils';
import { SUPER_ADMIN, FUNCTIONAL_ADMIN, CORPORATE_ADMIN, USER } from '../../utils/Const';
const mongooseIntl = require('mongoose-intl');
const { env, JWT_SECRET, JWT_EXPIRATION_MINUTES } = require('../../../config/vars');

/**
 * User types
 */
const types = [SUPER_ADMIN, FUNCTIONAL_ADMIN, CORPORATE_ADMIN, USER];

/**
 * User gender
 */
const gender = ['male', 'female'];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: { unique: true }
    },
    phone: {
      type: String,
      trim: true,
      default: null
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128
    },
    tempPassword: {
      type: String, // one-time temporary password (must delete after user logged in)
      required: false,
      minlength: 6,
      maxlength: 128
    },
    services: {
      facebook: String,
      google: String
    },
    firstName: {
      ar:{
        type: String,
        maxlength: 128
      },
      fr: {
        type: String,
      maxlength: 128
      }
    },
    lastName: {
      ar:{
        type: String,
        maxlength: 128
      },
      fr: {
        type: String,
      maxlength: 128
      }
    },
    picture: {
      type: String,
      trim: true,
      default: null
    },
    activated: {
      type: Boolean,
      default: true
    },
    gender: {
      type: String,
      enum: gender,
   
    },
    birthDay: {
      type: Date
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
      }
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false
      }
    ],
    type: {
      type: String,
      enum: types,
      default: USER
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  },
  {
    timestamps: true
  }
);
const ALLOWED_FIELDS = [
  'id',
  'email',
  'phone',
  'firstName',
  'lastName',
  'picture',
  'gender',
  'birthday',
  'address',
  'role',
  'activated',
  'type'
];

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre('save', async function save(next: NextFunction) {
  try {
    // modifying password => encrypt it:
    const rounds = env === 'development' ? 1 : 10;
    if (this.isModified('password')) {
      const hash = await bcrypt.hash(this.password, rounds);
      this.password = hash;
    } else if (this.isModified('tempPassword')) {
      const hash = await bcrypt.hash(this.tempPassword, rounds);
      this.tempPassword = hash;
    }
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  },

  token() {
    const playload = {
      exp: moment().add(JWT_EXPIRATION_MINUTES, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
      type: this.type
    };
    return jwt.encode(playload, JWT_SECRET);
  },

  async passwordMatches(password: string) {
    return bcrypt.compare(password, this.password);
  }
});

/**
 * Statics
 */
userSchema.statics = {
  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id: any) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options: any, type: string) {
    const { email, phone, password, refreshObject } = options;

    if (!email && !phone) {
      throw new APIError({ message: 'An email is required to generate a token' });
    }
    let user;

    if (phone) {
      user = await this.findOne({ phone, type }).exec();
    } else {
      user = await this.findOne({ email, type }).exec();
    }

    const err: any = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true
    };
    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      if (moment(refreshObject.expires).isBefore()) {
        err.message = 'Invalid refresh token.';
      } else {
        return { user, accessToken: user.token() };
      }
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  /**
   * List users.
   * @returns {Promise<User[]>}
   */
  list({ query }: { query: any }) {
    return listData(this, query, ALLOWED_FIELDS);
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error: any) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [
          {
            field: 'email',
            location: 'body',
            messages: ['"email" already exists']
          }
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }
    return error;
  },

  async oAuthLogin({ service, id, email, name, picture }: any) {
    const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
    if (user) {
      user.services[service] = id;
      if (!user.name) {
        user.name = name;
      }
      if (!user.picture) {
        user.picture = picture;
      }
      return user.save();
    }
    const password = uuidv4();
    return this.create({
      services: { [service]: id },
      email,
      password,
      name,
      picture
    });
  },

  async count() {
    return this.find().count();
  }
};

/**
 * @typedef User
 */
mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'fr'], defaultLanguage: 'ar' });
userSchema.plugin(mongoose_delete, { deletedAt: true });
const User = mongoose.model('User', userSchema);
User.ALLOWED_FIELDS = ALLOWED_FIELDS;
User.types = types;
module.exports = User;
