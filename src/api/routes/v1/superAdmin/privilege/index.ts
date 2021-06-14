export { };
import * as express from 'express';

const router = express.Router();

// Routes
const roleRoutes = require('./role.route');
const permissionRoutes = require('./permission.route');

router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);

module.exports = router;
