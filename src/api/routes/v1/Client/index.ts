export { };
import * as express from 'express';

const ClientRoute = require("./Client.route");
const router = express.Router();

router.use('/', ClientRoute);


module.exports = router;
