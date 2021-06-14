export { };
import * as express from 'express';

const router = express.Router();

// Routes
const authRoutes = require('./auth.route');
const creditTypeRoutes = require('./credittypes.route');
const adminRoutes = require('./admin/auth.route');
const roleRoutes = require('./privilege');
const corporateRoutes = require('./corporate');

router.use('/auth', authRoutes);
router.use('/creditTypes', creditTypeRoutes);
router.use('/admin', adminRoutes);
router.use('/corporate', corporateRoutes);

router.use('/privilege', roleRoutes);

module.exports = router;
