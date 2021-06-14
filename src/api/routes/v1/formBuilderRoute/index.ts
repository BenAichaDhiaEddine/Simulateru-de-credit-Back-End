export { };
import * as express from 'express';

const formRoute = require("./formBuilder.route");
const router = express.Router();
router.use('/form', formRoute);


module.exports = router;