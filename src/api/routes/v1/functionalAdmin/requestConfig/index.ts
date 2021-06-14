export { };
import * as express from 'express';

const requestConfig = require('./requestConfigInfo');
const option = require('./option.route');
const condition = require('./condition.route');


const router = express.Router();


router.use('/', requestConfig);
router.use('/options', option);
router.use('/conditions', condition);

module.exports = router;
