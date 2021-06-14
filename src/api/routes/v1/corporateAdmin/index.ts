export { };
import * as express from 'express';

const authRoutes = require('./auth.route');

const router = express.Router();

router.use('/auth', authRoutes);


module.exports = router;
