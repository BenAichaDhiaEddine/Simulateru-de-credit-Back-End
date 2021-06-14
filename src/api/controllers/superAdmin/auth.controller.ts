import { NextFunction, Request, Response } from 'express';
import { User } from 'api/models';
import { SUPER_ADMIN } from 'api/utils/Const';

const { pick } = require('lodash');
const bcrypt = require('bcryptjs');
const userAgent = require('express-useragent');
// Utils
const moment = require('moment-timezone');
import { apiJson } from 'api/utils/Utils';

// Config
const { JWT_EXPIRATION_MINUTES } = require('config/vars');

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(accessToken: string) {
  const tokenType = 'Bearer';
  const expiresIn = moment().add(JWT_EXPIRATION_MINUTES, 'minutes');
  return {
    tokenType,
    accessToken,
    expiresIn
  };
}


/**
 * Returns jwt token if valid email and password is provided
 * @public
 */
exports.login = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { ip, headers } = req;
    const { accessToken } = await User.findAndGenerateToken(req.body, SUPER_ADMIN);
    const token = generateTokenResponse(accessToken);
    const data = { token };
    return apiJson({ req, res, data });
  }
 catch (error) {
    return next(error);
  }
};


/**
 * update password
 * @public
 */
exports.resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inputs = pick(req.body, ['newPassword', 'oldPassword']);
    
    const user = await User.findOne({ email: req.route?.meta?.user?.email });
    
    if (!user) {
      return next({ message: 'Invalid request' });
    }

    // user found => generate temp password, then email it to user:
    const { password } = user;
    if (!(await bcrypt.compare(inputs.oldPassword, password)))
      return res.status(400).send('Incorrect old Password').end();
    user.password = inputs.newPassword;
    await user.save();
    return apiJson({ req, res, data: { status: 'Your password was successfully updated' } });
  } catch (error) {
    return next(error);
  }
};
