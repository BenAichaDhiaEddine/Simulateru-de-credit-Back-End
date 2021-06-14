import { upload } from "../../../middlewares/upload";

export {};
const express = require("express");
const controller = require("../../../controllers/Client/auth.controller");
const { authorize } = require("api/middlewares/auth");
const router = express.Router();

/**
 * @api {}  /v1/Client/
 * @apiHeader {String} Athorization  functionalAdmin's access token
 */

 router.route("/getUserWithtoken")
 .get(controller.getUserWithtoken);

 router.route("/login")
.post(controller.login)

router.route("/logout")
.post(controller.logout)

 router.route("/:id")
.put(upload.single('file'),controller.updateUser)
.get(controller.getUser)
.delete(controller.remove)

router.route("/")
.post(controller.register)
.get(controller.list);


module.exports = router;
