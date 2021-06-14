export { };
import * as express from 'express';
const router = express.Router();

// Routes
const superAdminRoutes = require('./superAdmin');
const adminRoutes = require('./functionalAdmin');
const corporateAdminRoutes = require('./corporateAdmin');
const uploadRoutes = require('./upload.route');
const usersRoutes = require('./user.route');
const FormBuilderRoutes = require("./formBuilderRoute");
const Client = require("./Client")


router.use('/superAdmin', superAdminRoutes);
router.use('/functionalAdmin', adminRoutes);
router.use('/corporateAdmin', corporateAdminRoutes);
router.use('/upload', uploadRoutes);
router.use('/users', usersRoutes);
router.use("/formBuilder" , FormBuilderRoutes);
router.use("/Client" ,Client)

module.exports = router;


