export { }
const express = require('express')
const controller = require('api/controllers/functionalAdmin/formBuilder/formBuilder.controller')
const { authorize } = require('api/middlewares/auth');
const router = express.Router()

import { FUNCTIONAL_ADMIN, SUPER_ADMIN } from 'api/utils/Const';
  /**
   * @api {}  /v1/formBuilder/step/:id  -
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */

router.route('/:cid')
.get(controller.getStep)
.put(controller.putStep)
.delete(controller.remove)
.post(controller.createOrGet)


module.exports = router
