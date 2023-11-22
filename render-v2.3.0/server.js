/*!
governify-render 1.0.0, built on: 2018-05-09
Copyright (C) 2018 ISA group
http://www.isa.us.es/
https://github.com/isa-group/governify-render#readme

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

'use strict';

function check (name, pass, config) {
  const nameOK = config.auth.user;
  const passOK = config.auth.password;

  let valid = true;
  valid = name === nameOK && valid;
  valid = pass === passOK && valid;
  return valid;
}

const deploy = (env, commonsMiddleware, callback) => {
  return new Promise((resolve, reject) => {
    try {
      const bodyParser = require('body-parser');
      const express = require('express');
      const cors = require('cors');
      const helmet = require('helmet');
      const compression = require('compression');
      const basicAuth = require('basic-auth');
      const path = require('path');
      const governify = require('governify-commons');
      const logger = governify.getLogger().tag('initialization');
      const config = require('./src/backend/configurations');

      const app = express();

      app.use(
        bodyParser.urlencoded({
          limit: '50mb',
          extended: 'true'
        })
      );

      app.use(
        bodyParser.json({
          limit: '50mb',
          type: 'application/json'
        })
      );

      app.use(commonsMiddleware);

      if (config.server.enableHTTPBasicAuth) {
        logger.info("Adding 'WWW-Authenticate:' header to every path. Check config/env for getting user and pass");
        app.use((req, res, next) => {
          const credentials = basicAuth(req);
          if (!credentials || !check(credentials.name, credentials.pass, config)) {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Snapshot Management Login"');
            res.end('Unauthorized');
          } else {
            next();
          }
        });
      }

      const routes = require('./src/backend/routes.js');

      app.use(compression());

      const frontendPath = path.join(__dirname, '/src/frontend');
      logger.info("Serving '%s' as static folder", frontendPath);
      app.use(express.static(frontendPath));

      if (config.server.bypassCORS) {
        logger.info("Adding 'Access-Control-Allow-Origin: *' header to every path.");
        app.use(cors());
      }
      if (config.server.useHelmet) {
        logger.info('Adding Helmet related headers.');
        app.use(helmet());
      }

      // Bypassing 405 status put by swagger when no request handler is defined
      app.options('/*', (req, res, next) => {
        return res.sendStatus(200);
      });

      const serverPort = process.env.PORT || config.server.port;

      app.listen(serverPort, () => {
        logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      });

      // For all GET requests, send back index.html
      app.use('/', routes);

      // app.use('/', express.static(__dirname + '/public'));
    } catch (err) {
      reject(err);
    }
  });
};

const undeploy = () => {
  process.exit();
};

module.exports = {
  deploy: deploy,
  undeploy: undeploy
};
