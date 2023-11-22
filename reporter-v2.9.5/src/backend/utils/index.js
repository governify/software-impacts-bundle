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
const gPeriods = governify.periods;
const _ = require('lodash');

module.exports = {
  swagger: require('./swagger.js'),
  getPeriods: _getPeriods,
  textReplaceReferencesFromJSON: textReplaceReferencesFromJSON
};

/**
 * This method returns a set of periods which are based on a window parameter.
 * @param {AgreementModel} agreement agreement model
 * @param {WindowModel} window window model
 * @return {Set} set of periods
 * @alias module:gUtils.getPeriods
 **/
function _getPeriods (agreement, window) {
  const Wfrom = new Date(window.initial);
  const Wto = window.end ? new Date(window.end) : new Date();

  const dates = gPeriods.getDates(Wfrom, Wto, window.period, Wto);
  return gPeriods.getPeriods(dates, agreement.context.validity.timeZone, false);
}

// This function receives a text when variables can be declared with [startingDefinition].???.???[endDefinition] and replace them with the json content referenced
// Example: textReplaceReferencesFromJSON(JSON.stringify(targetText), agreement, '>>>agreement.', "<<<"))
// This function will replace all variables in text like >>>agreement.id<<< with the property id of the json
function textReplaceReferencesFromJSON (targetText, json, startingDefinition, endDefinition) {
  let finalText = targetText;
  // Returns an array of array with format [key, value], [key, value]
  // Key is the complete unparsed text >>>agreement.id<<<, and the value the parsed text (id)
  const matches = [...targetText.matchAll(startingDefinition + '([^<]+)' + endDefinition)];
  matches?.forEach((match) => {
    // Variable replacement
    finalText = finalText.replace(match[0], _.get(json, match[1]));
  });
  return finalText;
}
