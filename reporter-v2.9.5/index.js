'use strict';

if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) require('newrelic');

const governify = require('governify-commons');
const logger = governify.getLogger().tag('index');

logger.info('Deploy request received');
let server = null;

governify.init({
  configurations: [{
    name: 'main',
    location: './configurations/main.' + (process.env.NODE_ENV || 'development') + '.yaml',
    default: true
  }]
}).then(function (commonsMiddleware) {
  server = require('./server');
  server.deploy(null, commonsMiddleware, function () {
    logger.info('Deploy successfully done');
  });
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
  logger.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
  logger.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// shut down server
function shutdown() {
  server.undeploy(function onServerClosed(err) {
    if (err) {
      logger.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}
