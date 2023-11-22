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

const writer = require('../../utils/writer');
const ReporterController = require('./ReporterController');
const governify = require('governify-commons');
const config = governify.configurator.getConfig('main');

module.exports.contractsContractIdStartGET = function contractsContractIdStartGET (req, res, next) {
  const contractId = req.swagger.params.contractId.value;
  const timer = req.swagger.params.timer.value || config.defaults.timer;
  const loop = req.swagger.params.loop.value || config.defaults.loop;

  const from = req.headers.from;
  const to = req.headers.to;

  if (from && to) {
    var periods = [];
    const period = {};
    period.from = from;
    period.to = to;
    periods.push(period);
  }

  ReporterController.contractsContractIdStartGET(contractId, timer, loop, periods)
    .then((response) => {
      writer.writeJson(res, response);
    })
    .catch((response) => {
      writer.writeJson(res, response);
    });
};

module.exports.contractsContractIdStopGET = function contractsContractIdStopGET (req, res, next) {
  const contractId = req.swagger.params.contractId.value;
  ReporterController.contractsContractIdStopGET(contractId)
    .then((response) => {
      writer.writeJson(res, response);
    })
    .catch((response) => {
      writer.writeJson(res, response);
    });
};

module.exports.contractsContractIdUpdateGET = function contractsContractIdUpdateGET (req, res, next) {
  const contractId = req.swagger.params.contractId.value;

  ReporterController.contractsContractIdUpdateGET(contractId)
    .then((response) => {
      writer.writeJson(res, response);
    })
    .catch((response) => {
      writer.writeJson(res, response);
    });
};

module.exports.contractsContractIdCreateHistoryPOST = function contractsContractIdCreateHistoryPOST (req, res, next) {
  const contractId = req.swagger.params.contractId.value;
  const period = req.body.division;

  ReporterController.contractsContractIdCreateHistoryPOST(contractId, period)
    .then((response) => {
      writer.writeJson(res, response);
    })
    .catch((response) => {
      writer.writeJson(res, response);
    });
};

module.exports.contractsContractIdCreatePointsFromPeriodsPOST = function contractsContractIdCreatePointsFromPeriodsPOST (req, res, next) {
  const contractId = req.swagger.params.contractId.value;
  const periods = req.body.periods;

  ReporterController.contractsContractIdCreatePointsFromPeriodsPOST(contractId, periods)
    .then((response) => {
      writer.writeJson(res, response);
    })
    .catch((response) => {
      writer.writeJson(res, response);
    });
};

module.exports.contractsContractIdCreatePointsFromListPOST = function contractsContractIdCreatePointsFromListPOST (req, res, next) {
  const contractId = req.swagger.params.contractId.value;
  const list = req.body.points;

  ReporterController.contractsContractIdCreatePointsFromListPOST(contractId, list)
    .then((response) => {
      writer.writeJson(res, response);
    })
    .catch((response) => {
      writer.writeJson(res, response);
    });
};

module.exports.contractsContractIdCreatePointsFromListGET = function contractsContractIdCreatePointsFromListGET (req, res, next) {
  const contractId = req.swagger.params.contractId.value;

  ReporterController.contractsContractIdCreatePointsFromListGET(contractId)
    .then((response) => {
      writer.writeJson(res, response);
    })
    .catch((response) => {
      writer.writeJson(res, response);
    });
};

module.exports.resetPOST = function resetPOST (req, res, next) {
  ReporterController.resetPOST(req.swagger.params, res, next);
};
