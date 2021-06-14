export { };
import * as express from 'express';

const authRoutes = require('./auth.route');
const corporateRoutes = require('./corporate');
const teamRoutes = require('./team.route');
const requestConfig = require('./requestConfig');
const corporateAdminRoutes = require('./CorporateAdmin.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/corporate', corporateRoutes);
router.use('/teams', teamRoutes);
router.use('/requestConfig', requestConfig);
router.use('/admins', corporateAdminRoutes);
module.exports = router;
