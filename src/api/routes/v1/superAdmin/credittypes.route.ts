export { }
const express = require('express')
const validate = require('express-validation')
const controller = require('api/controllers/superAdmin/creditType.controller')
const { create, list, update, remove } = require('api/validations/creditType.validation')
// Middleware
const { authorize } = require('api/middlewares/auth');
const { upload } = require('api/middlewares/upload');
const router = express.Router()

//const
import { SUPER_ADMIN } from 'api/utils/Const';
/**
 * Load team category when API with id route parameter is hit
 */
router.param('id', controller.load)

router.route('/')
  /**
   * @api {post}/v1/superAdmin/credittypes  - Create CreditType
   * @apiHeader {String} Athorization  superAdmin's access token
   */
  .post(authorize([SUPER_ADMIN]), upload.single('iconPath'), controller.create)

  /**
   * @api {get}  /v1/superAdmin/credittypes  - teamscategories list
   * @apiHeader {String} Athorization  superAdmin's access token
   */
  .get(validate(list), controller.list)

router.route('/:id')

  /**
   * @api{patch}  /v1/superAdmin/credittypes/:id  - change creditType status
   * @apiHeader {String} Athorization  superAdmin's access token
   */
  .patch(authorize([SUPER_ADMIN]),validate(update),controller.update)

  /**
   * @api {delete}  /v1/superAdmin/credittypes/:id  -delete creditType
   * @apiHeader {String} Athorization  superAdmin's access token
   */
  .delete(authorize([SUPER_ADMIN]),validate(remove),controller.remove)


module.exports = router
