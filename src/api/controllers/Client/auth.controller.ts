export {};
import { NextFunction, Request, Response } from "express";
const { handler: errorHandler } = require("api/middlewares/error");
const { omit, pick } = require("lodash");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

// Modals
import { Client, RefreshToken } from "api/models";
// Utils
const moment = require("moment-timezone");
import { apiJson, randomString, startTimer } from "api/utils/Utils";
import { copyFileFromTmpToPath } from "../../services/folderService";

const {
  env,
  JWT_SECRET,
  JWT_EXPIRATION_MINUTES,
} = require("../../../config/vars");

/**
 * Returns jwt token if registration was successful
 *
 */
exports.register = async (req: Request, res: Response) => {
  try {
    const User = await new Client({ ...req.body })
      .save()
      .catch((error: any) => {
        res.status(400).json("Bad Request");
      });
    var token = jwt.sign({ id: User._id }, JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    await res.status(200).send({ User: User, auth: true, token: token });
  } catch (error) {
    console.log(error);
  }
};

/**
 * get list of users
 *
 */
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    const data = await Client.find({deleted : false});
    res.json(data);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * update a user
 *
 */
exports.updateUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    var newUser;
    startTimer({ req });
    console.log("req.body", req.body);
    let id = req.params.id;
    const userFinded = await Client.findOne({ _id: id , deleted : false });
    const rounds = env === "development" ? 1 : 10;
    //if password is modified
    if (req.body.password) {
      var body = req.body;
      const hash = await bcrypt.hash(body.password, rounds);
      body = { ...body, password: hash };
      newUser = new Client({ _id: id, ...body });
    } else {
      newUser = new Client({ _id: id, ...req.body});
    }
    const newUserObject = omit(newUser.toObject(), "_id");
    if (req.file) newUserObject.file = await copyFileFromTmpToPath(req.file, '/corporates/client');
    await userFinded.update(newUserObject, { override: true, upsert: true });

    const savedUser = await Client.findOne({ _id: id , deleted : false});
    res.json(savedUser);
  } catch (error) {
    console.log("====>",error);
    
    return errorHandler(error, req, res);
  }
};

/**
 * update a user
 *
 */
exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req });
    let id = req.params.id;
    const User = await Client.findOne({ _id: id , deleted : false });
    res.json(User);
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Safe-delete a user
 *
 */
exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  startTimer({ req });
  let id = req.params.id;
  const User = await Client.findOne({ _id: id , deleted : false});
  User.delete()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e: any) => next(e));
};

/**
 * get the with his token
 *
 */
exports.getUserWithtoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, JWT_SECRET, function (err: any, decoded: any) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    Client.findById(
      decoded._id,
      { password: 0, deleted: 0, createdAt: 0, updatedAt: 0, __v: 0 },
      function (err: any, Client: any) {
        if (err)
          return res.status(500).send("There was a problem finding the user.");
        if (!Client) return res.status(404).send("No user found.");

        res.status(200).send(Client);
      }
    );
  });
};

/**
 * login
 *
 */
exports.login = async (req: Request, res: Response, next: NextFunction) => {
  Client.findOne({ email: req.body.email , deleted : false }, function (err: any, user: any) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
};

/**
 * logout
 *
 */
exports.logout = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ auth: false, token: null });
};
