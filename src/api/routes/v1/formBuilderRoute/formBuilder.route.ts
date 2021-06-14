export { };
const express = require('express');
const controller = require('api/controllers/form.controller');


const router = express.Router();

// Middleware
const { authorize } = require('api/middlewares/auth');


//const
import { FUNCTIONAL_ADMIN } from 'api/utils/Const';
// import { upload } from '../../../../middlewares/upload';

/**
 * Load Form when API with formId route parameter is hit
 */
router.param('formId', controller.load);

router.route('/')
  /**
   * @api 
   * @apiHeader 
   */
  .get(authorize([FUNCTIONAL_ADMIN]), controller.list);

router.route('/addform')
  /**
   * @api 
   * @apiHeader 
   */
  .post(authorize([FUNCTIONAL_ADMIN]), controller.create);

router.route('/:formId')

  .put(authorize([FUNCTIONAL_ADMIN]), controller.update)
  .get(authorize([FUNCTIONAL_ADMIN]), controller.retrieve)
  .delete(authorize([FUNCTIONAL_ADMIN]), controller.remove);


module.exports = router;
