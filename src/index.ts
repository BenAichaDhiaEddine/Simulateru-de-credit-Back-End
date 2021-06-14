import { createFolder } from './api/services/folderService'

// setup mstime to measure API response time
const mstime = require('mstime');
const http = require('http');


mstime.plugins([{ plugin: require('mstime/dist/cjs/plugins/msPluginTrimMean') }]);
mstime.start('app-start');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env, socketEnabled } = require('./config/vars');

const app = require('./config/express');
const socket = require('api/services/socket');

const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// create http server
const server = http.createServer(app);

if (socketEnabled) {
  socket.setup(server);
}

createFolder('/tmp')

server.listen(port, () => {
  console.info(`--- 🌟  Started (${env}) --- https://localhost:${port}`);
  console.log(`${mstime.end('app-start').last} ms`);
});

// initialize the configuration SuperAdmin data for the App
require('./api/utils/superAdmin/InitSuperAdminConfigData');

/**
 * Exports express
 * @public
 */
module.exports = app;
