export {};
const express = require('express');
const controller = require('api/controllers/functionalAdmin/team.controller');

const router = express.Router();
// Middleware
const { authorize } = require('api/middlewares/auth');

//const
import { FUNCTIONAL_ADMIN } from 'api/utils/Const';



/**
 * Load team when API with id route parameter is hit
 */
router.param('id', controller.load);

router.route('/')
  /**
   * {post}  /v1/admin/teams => Create team
   */
.post(authorize([FUNCTIONAL_ADMIN]), controller.create)
/**
   * @api {get}/v1/functionalAdmin/teams  - retreive teams by functionalAdmin
   * @apiHeader {String} Athorization  functionalAdmin's access token
   */
.get(authorize([FUNCTIONAL_ADMIN]), controller.list);



router.route('/:id')
/**
 * {put}  /v1/admin/teams/:id => Update team
 */
.put(authorize([FUNCTIONAL_ADMIN]), controller.update)

/**
 * {delete}  /v1/admin/teams/:id => remove team
 */
.delete(authorize([FUNCTIONAL_ADMIN]), controller.remove);



module.exports = router;
