'use strict';

if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) require('newrelic');

const governify = require('governify-commons');
const logger = governify.getLogger().tag('controller-tasks');

const server = require('./server');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

governify.init().then(commonsMiddleware => {
  server.deploy(env, commonsMiddleware).catch(err => { logger.info(err); });
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
  logger.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  logger.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

const shutdown = () => {
  server.undeploy();
};
