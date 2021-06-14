export { };
const httpStatus = require('http-status');
const passport = require('passport');
import { User } from 'api/models';
const APIError = require('../utils/APIError');


import * as Bluebird from 'bluebird';
const handleJWT = (req: any, res: any, next: any, types: any) => async (err: any, user: any, info: any) => {  const error = err || info;
  const logIn: any = Bluebird.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined
  });

  try {
    if (error || !user) {
      throw error;
    }
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (!types.includes(user.type)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }
  req.route = req.route || {}
  req.route.meta = req.route.meta || {};
  req.route.meta.user = user;
  

  return next();
};

exports.authorize = (types = User.types) => (req: any, res: any, next: any) =>
  passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, types))(req, res, next);

exports.oAuth = (service: any) => passport.authenticate(service, { session: false });
