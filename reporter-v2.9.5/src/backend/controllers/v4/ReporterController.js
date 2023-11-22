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

const moment = require('moment-timezone');

const InfluxDB = require('../../services/influxService').InfluxDB;
const Reporter = require('../../services/gaussReporterService/').GaussReporter;
const governify = require('governify-commons');
const gPeriods = governify.periods;
const config = governify.configurator.getConfig('main');
const logger = governify.getLogger().tag('v4-reporter-controller');
const JSONStream = require('JSONStream');
const Promise = require('bluebird');
const objectiveUtils = require('../../utils/objective-utils');
const utils = require('../../utils');

const influx = new InfluxDB(governify.infrastructure.getServiceURL('internal.database.influx-reporter'), config.influx.database, config.influx.measurement, config.influx.fields, config.influx.tags);

const reporter = new Reporter(influx);
const statusCreatePoints = {};

const periodInserted = 10; // Num of periods to insert in one write call

let looper;
/**
 * Start retrieving KPIs information
 *
 * contractId String Contract ID
 * timer String timer (optional)
 * loop String loop (optional)
 * no response value expected for this operation
 **/
exports.contractsContractIdStartGET = (contractId, timer, loop, periods) => {
  return new Promise((resolve, reject) => {
    reporter.contractId = contractId;

    const loopProcess = (timer, loop, resolve, reject) => {
      reporter.isExecutionFinished = true;
      looper = setInterval(() => {
        if (loop && loop === 'false' && reporter.isExecutionFinished) {
          logger.info('Initializing a new process at ' + new Date().toISOString() + ' UTC');
          reporter.isExecutionFinished = false;

          reporter.process(periods).then(() => {
            logger.info('ExecutionFinished at ' + new Date().toISOString() + ' UTC');
            reporter.isExecutionFinished = true;
          }).catch((error) => {
            reporter.isExecutionFinished = true;
            return reject({
              code: 'REP-500D',
              message: 'there was an error',
              details: error
            });
          });
          return resolve({
            code: 'REP-200',
            message: 'OK: Initializing a new process at ' + new Date().toISOString() + ' UTC',
            details: ''
          });
        } else {
          logger.info('Execution is not finished yet. Loop process will keep trying');
          return resolve({
            code: 'REP-204',
            message: 'Execution is not finished yet. Loop process will keep trying',
            details: ''
          });
        }
      }, timer);
    };

    if (loop && loop === 'true') {
      loopProcess(timer, loop, resolve, reject);
    } else {
      reporter.isExecutionFinished = false;
      reporter.process(periods).then((res) => {
        logger.info('Execution finished at ' + new Date().toISOString() + ' UTC');
        reporter.isExecutionFinished = true;
        return resolve({
          code: 'REP-200',
          message: 'Execution finished at ' + new Date().toISOString() + ' UTC',
          details: ''
        });
      }).catch((error) => {
        return reject({
          code: 'REP-500B',
          message: 'there was an error',
          details: error
        });
      });
    }
  });
};

/**
 * Stop retrieving KPIs information
 *
 * contractId String Contract ID
 * no response value expected for this operation
 **/
exports.contractsContractIdStopGET = (contractId) => {
  return new Promise((resolve, reject) => {
    reporter.isExecutionFinished = false;
    clearTimeout(looper);
    return resolve({
      code: '200',
      message: 'OK: Process stopped at ' + new Date().toISOString() + ' UTC',
      details: ''
    });
  });
};

/**
 * Stop retrieving KPIs information
 *
 * contractId String Contract ID
 * no response value expected for this operation
 **/
exports.contractsContractIdCreatePointsFromListGET = (contractId) => {
  return new Promise((resolve, reject) => {
    resolve(statusCreatePoints[contractId]);
  });
};

/**
 * Create history and save points
 * contractId String Contract ID
 * no response value expected for this operation
 **/
exports.contractsContractIdCreateHistoryPOST = async (contractId, period) => {
  logger.info('Creating history for agreementID: ' + contractId);
  logger.info('Getting the agreements from Registry with contractId = %s', contractId);
  governify.infrastructure.getService('internal.registry').get('/api/v6/agreements/' + contractId)
    .then(async (agreementRequest) => {
      const agreement = agreementRequest.data;
      const periods = utils.getPeriods(agreement, {
        initial: agreement.context.validity.initial,
        period: period
      });

      await callRegistryAndStorePoints('/api/v6/states/' + contractId + '/guarantees' + '?lastPeriod=true', agreement)
        .then(async (influxPoints) => {
          await influxInsert(influxPoints).catch(() => 'Error inserting points of last period');
        }).catch(err => {
          logger.error('Error getting points from last period ' + err);
        });

      for (let chunk of chunkArray(periods, periodInserted)) {
        var influxPoints = [];
        for (let chunkperiod of chunk) {
          var newPoints = await callRegistryAndStorePoints('/api/v6/states/' + contractId + '/guarantees' + '?from=' + chunkperiod.from + '&to=' + chunkperiod.to, agreement)
            .catch(err => {
              logger.error(`Error getting points from period ${chunkperiod.from} to ${chunkperiod.to} ` + err)
            });
          try {
            influxPoints = [...influxPoints, ...newPoints];
          } catch (_) {
            continue;
          }
        }
        await influxInsert(influxPoints).catch(() => 'Error inserting periods ' + chunk);
      };
    }).catch(
      err => logger.error('Error creating history: ' + err)
    );
};

/**
 * Create history and save points
 *
 * contractId String Contract ID
 * no response value expected for this operation
 **/
exports.contractsContractIdCreatePointsFromListPOST = async (contractId, listDates) => {
  logger.info('Creating points from List for agreementID: ' + contractId);

  if (!statusCreatePoints[contractId]) {
    statusCreatePoints[contractId] = { current: 0, total: 1 };
    logger.info('Getting the agreements from Registry with contractId = %s', contractId);

    governify.infrastructure.getService('internal.registry').get('/api/v6/agreements' + contractId)
      .then(async agreementRequest => {
        const agreement = agreementRequest.data;
        const periods = listDates.map(x => { return { from: x, to: moment(x).add(1, 'second').toISOString() }; });

        for (let chunk of chunkArray(periods, periodInserted)) {
          var influxPoints = [];
          for (let chunkperiod of chunk) {
            statusCreatePoints[contractId] = { current: statusCreatePoints[contractId].current + 1, total: periods.length };
            var newPoints = await callRegistryAndStorePoints('/api/v6/states/' + contractId + '/guarantees' + '?from=' + chunkperiod.from + '&to=' + chunkperiod.to + '&newPeriodsFromGuarantees=false', agreement)
              .catch(err => {
                logger.error(`Error getting points from period ${chunkperiod.from} to ${chunkperiod.to} ` + err)
              });
            try {
              influxPoints = [...influxPoints, ...newPoints];
            } catch (_) {
              continue;
            }
          }
          await influxInsert(influxPoints).catch(() => 'Error inserting periods ' + chunk);
        }
        logger.info('Finished creating history for agreeement ' + contractId);
        statusCreatePoints[contractId] = undefined;

      }).catch(err => {
        logger.error(err);
        statusCreatePoints[contractId] = undefined;
      });
  }
};

/**
 * Updates KPIs information
 *
 * contractId String Contract ID
 * no response value expected for this operation
 **/
exports.contractsContractIdUpdateGET = async (contractId) => {
  const urlRegistryRequest = '/api/v6/states/' + contractId + '/guarantees' + '?from=' + new Date().toISOString() + '&to=' + moment().add(3, 'week').toISOString() + '&newPeriodsFromGuarantees=false';
  logger.info('Getting the agreements from Registry with contractId = %s', contractId);

  governify.infrastructure.getService('internal.registry').get('/api/v6/agreements/' + contractId)
    .then(async (agreementRequest) => {
      const agreement = agreementRequest.data;
      var influxPoints = await callRegistryAndStorePoints(urlRegistryRequest, agreement)
        .catch(err => {
          logger.error('Error getting points from period ' + err)
        });
      await influxInsert(influxPoints).catch(() => 'Error inserting points');
    }).catch(err => {
      logger.error('Failed requesting agreement: ', err.response ? err.response.status : -1);
    });
};

exports.resetPOST = function (args, res, next) {
  try {
    logger.info('Trying to reset Reporter and  Influx database!');
    const agreementId = args.contractId.value;

    // Delete influx db for the agreement

    influx.influx.dropSeries({
      measurement: m => m.name(config.influx.measurement),
      where: e => e.tag('agreement').equals.value(agreementId),
      database: config.influx.database
    });

    influx.influx.dropSeries({
      measurement: m => m.name(config.influx.measurement_historical),
      where: e => e.tag('agreement').equals.value(agreementId),
      database: config.influx.database
    });

    // Create database if it does not exist yet.
    influx.influx.getDatabaseNames().then(names => {
      logger.info('DBs in influxdb', names);
      if (!names.includes(config.influx.database)) {
        return influx.createDatabase(config.influx.database);
      }
    }).then(() => {
      logger.info('InfluxDb: DB created');
    }).catch(err => {
      logger.info('Error creating Influx database!');
    });

    res.status(200).json({
      code: 200,
      message: "Influx '" + config.influx.measurement_historical + "' and '" + config.influx.measurement + "' measurements have been removed."
    });
  } catch (err) {
    logger.error('Error when trying to stop reporter: ' + err);
    res.status(200).json({
      code: 500,
      message: 'Internal error'
    });
  }
};

function callRegistryAndStorePoints(path, agreement) {
  return new Promise(async (resolve, reject) => {
    logger.info('URLRegistry: ' + path);

    var timeout = setTimeout(() => {
      logger.error(path + ' request time out exceeded')
      resolve([])
    }, 120000)

    governify.infrastructure.getService('internal.registry')
      .request({
        url: path,
        responseType: 'stream'
      })
      .then(requestMetrics => {
        const requestStream = requestMetrics.data;
        const influxPoints = [];
        requestStream.pipe(JSONStream.parse())
          .on('data', guaranteeStates => {
            logger.info('Receiving agreement states');
            for (const i in guaranteeStates) {
              var guaranteeResult = guaranteeStates[i];

              const guaranteeResultWindow = agreement.terms.guarantees.find(x => x.id === guaranteeResult.id).of[0].window
              guaranteeResultWindow.from = gPeriods.getDates(new Date(guaranteeResultWindow.initial), new Date(guaranteeResult.period.to), guaranteeResultWindow.period || 'monthly');
              guaranteeResultWindow.from = guaranteeResultWindow.from[guaranteeResultWindow.from.length - 1]

              const timestamp = moment(guaranteeResultWindow.from).valueOf() * 1000000;

              const influxPoint = {
                measurement: config.influx.measurement,
                tags: {
                  agreement: guaranteeResult.agreementId,
                  id: guaranteeResult.id
                },
                fields: {
                  guaranteeValue: objectiveUtils.calculateObjective(agreement.terms.guarantees.find(x => x.id === guaranteeResult.id).of[0].objective, guaranteeResult.metrics).value,
                  guaranteeResult: guaranteeResult.value
                },
                timestamp: timestamp
              };

              for (const [key, value] of Object.entries(guaranteeResult.metrics)) {
                influxPoint.fields['metric_' + key] = value;
              }
              for (const [key, value] of Object.entries(guaranteeResult.scope)) {
                influxPoint.tags['scope_' + key] = value;
              }
              influxPoints.push(influxPoint);
            }
          })
          .on('end', () => {
            clearTimeout(timeout)
            resolve(influxPoints)
          })
          .on('error', err => reject(err));
      })
      .catch(err => {
        logger.error('Error in registry state call: ', err);
        reject(err);
      });
  });
}

var influxInsert = async (elements) => {
  influx.influx.writePoints(elements, {
    maxRetries: 50,
    requestTimeout: 600000
  })
    .then(() => {
      logger.info(`Inserted ${elements.length} elements`);
    })
    .catch((err) => {
      logger.info('Error Writing in db ', err);
    });
};

/**
 * Create history and save points
 *
 * contractId String Contract ID
 * no response value expected for this operation
 **/
exports.contractsContractIdCreatePointsFromPeriodsPOST = async (contractId, periods) => {
  logger.info('Creating points from List for agreementID: ' + contractId);
  logger.info('Getting the agreements from Registry with contractId = %s', contractId);

  governify.infrastructure.getService('internal.registry').get('/api/v6/agreements/' + contractId)
    .then(async (agreementRequest) => {
      const agreement = agreementRequest.data;

      for (let chunk of chunkArray(periods, periodInserted)) {
        var influxPoints = [];
        for (let chunkperiod of chunk) {
          var newPoints = await callRegistryAndStorePoints('/api/v6/states/' + contractId + '/guarantees' + '?from=' + chunkperiod.from + '&to=' + chunkperiod.to + '&newPeriodsFromGuarantees=false', agreement)
            .catch(err => {
              logger.error(`Error getting points from period ${chunkperiod.from} to ${chunkperiod.to} ` + err)
            });
          try {
            influxPoints = [...influxPoints, ...newPoints];
          } catch (_) {
            continue;
          }
        }
        await influxInsert(influxPoints).catch(() => 'Error inserting periods ' + chunk);
      }
      logger.info('Finished creating event collector metrics for agreeement ' + contractId);
    }).catch(err => {
      logger.error('Failed requesting agreement: ', err.response ? err.response.status : -1);
    });
};

function chunkArray(myArray, chunk_size) {
  var results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  return results;
}