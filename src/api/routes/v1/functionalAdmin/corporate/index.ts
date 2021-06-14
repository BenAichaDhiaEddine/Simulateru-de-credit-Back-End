export { };
import * as express from 'express';

const corporateRoutes = require('./corporate.route');
const corporateConfigRoutes = require('./corporateConfig.route');

const router = express.Router();

router.use('/config', corporateConfigRoutes);
router.use('/', corporateRoutes);


module.exports = router;
