/*!
governify-project-gauss-reporter 1.0.0, built on: 2018-04-19
Copyright (C) 2018 ISA group
http://www.isa.us.es/
https://github.com/isa-group/governify-project-gauss-reporter

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

const governify = require('governify-commons');
const logger = governify.getLogger().tag('v4-dashboard-controller');
const utils = require('../../../utils/index');
const baseDashboard = require('../../../dashboards/blocks/base.json')
const blocksToDashboard = require('../../../dashboards/blocks/blocksToDashboard')

/**
 * Return dashboard JSON for grafana
 **/

exports.dashboardGET = async (req, res, next) => {
  var params = req.swagger.params;
  var agreementId = params.agreementId.value;
  var dashboardId = params.dashboardId.value;
  var boolGetBaseDashboard = params.base.value;
  const agreementRequest = await governify.infrastructure.getService('internal.registry').get('/api/v6/agreements/' + agreementId);
  const agreement = agreementRequest.data;
  try {
    var dashboardConfig = agreement.context.definitions.dashboards[dashboardId]


    var dashboardJSON;
    if (dashboardConfig.config && dashboardConfig.config.configDashboard) {
      dashboardJSON = await configDashboard(agreement, dashboardId);
    }
    else {
      dashboardJSON = await customDashboard(dashboardConfig, agreement, dashboardId);
    }
    res.status(200).send(dashboardJSON);
  } catch (err) {
    console.log("Err: ", err)
    logger.error('Error getting dynamic dashboard. agreementId: ' + agreementId + ' dashboardId: ' + dashboardId + ' - ERROR: ' + err);
    res.status(400).send(err);
  }
};



const customDashboard = async (dashboardConfig, agreement, dashboardId) => {
  // Get the JSON file
  var dashboardJSON = await governify.utils.loadObjectFromFileOrURL(dashboardConfig.base);
  // Replace all agreement variables specified in the json
  var stringDashboardJSON = utils.textReplaceReferencesFromJSON(JSON.stringify(dashboardJSON), agreement, '>>>agreement.', '<<<');
  dashboardJSON = JSON.parse(stringDashboardJSON)

  // Check if there is a base modifier
  if (dashboardConfig.modifier && dashboardConfig.modifier !== '') {
    var dashboardBaseModifier = await governify.utils.requireFromFileOrURL(dashboardConfig.modifier, dashboardConfig.modifier);

    // Apply modifier functions of the dashboard
    dashboardJSON = dashboardBaseModifier.modifyJSON(dashboardJSON, agreement, dashboardId);
  }

  if (dashboardConfig.modifierPipe && typeof dashboardConfig.modifierPipe === 'object') {
    const modifierPipe = Object.entries(dashboardConfig.modifierPipe).sort((a, b) => a[0] - b[0])
    //Apply each modifier
    for (const [_, modifier] of modifierPipe) {

      var dashboardModifier = await governify.utils.requireFromFileOrURL(modifier, modifier);
      dashboardJSON = dashboardModifier.modifyJSON(dashboardJSON, agreement, dashboardId);
    }
  }

  return dashboardJSON;
}

const configDashboard = async (agreement, dashboardId) => {
  var dashboardJSON = { ...baseDashboard }
  var stringDashboardJSON = utils.textReplaceReferencesFromJSON(JSON.stringify(dashboardJSON), agreement, '>>>agreement.', '<<<');
  dashboardJSON = JSON.parse(stringDashboardJSON)
  dashboardJSON = blocksToDashboard.default(dashboardJSON, agreement, dashboardId)

  return dashboardJSON
}
