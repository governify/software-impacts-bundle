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
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

(function () {

    'use strict';

    angular
        .module('reporterApp')
        .controller('evidencesCtrl', EvidencesController);

    EvidencesController.$inject = ['evidencesService', '$rootScope', '$state', '$scope', '$q', '$http', '$timeout', '$stateParams'];

    function EvidencesController(evidencesService, $rootScope, $state, $scope, $q, $http, $timeout, $stateParams) {

        $rootScope.publicInfrastructurePromise.then(function () { //Config must be loaded


            $scope.error = null;
            $scope.loading = true;
            $scope.progress = 0;
            $scope.evidences = [];
            $scope.DEFAULT_AGREEMENT = "SCO";
            $scope.DEFAULT_INDICATORS = ["SCO_TRS", "SCO_TRLO", "SCO_TRLP", "SCO_PU"];
            $scope.DEFAULT_TYPES = ["metrics", "guarantees"];
            $scope.calculated = false;
            $scope.loadingOverrides = false;

            var monthYear = moment.tz($stateParams.period, 'x', $stateParams.tz).format('MMMM YYYY', 'es');
            var month = moment.tz($stateParams.period, 'x', $stateParams.tz).format('MMMM', 'es');

            $scope.agreementMonth = month;

            $scope.query = {
                agreement: $stateParams.agreement,
                indicator: $stateParams.guarantee,
                tz: $stateParams.tz,
                type: "guarantees",
                period: $stateParams.period,
                periodFormated: monthYear.charAt(0).toUpperCase() + monthYear.slice(1),

            };

            $scope.calculateReport = (queryParam) => {

                queryParam.from = moment.tz(queryParam.period, "x", queryParam.tz).toISOString();
                //   queryParam.to = moment.tz(queryParam.period, "x", queryParam.tz).add(1, "second").subtract(1, "millisecond").toISOString();


                evidencesService.getEvidences(queryParam).then((ev) => {

                    $scope.progress = 100;
                    $scope.typeEvidences = getTypeEvidences(ev);


                    $scope.evidences = ev;

                    for (var i = 0; i < $scope.typeEvidences.length; i++) {
                        if ($scope.typeEvidences[i].indexOf("evidence") >= 0) {
                            $scope.typeEvidence = $scope.typeEvidences[i]
                            break;
                        }
                    }

                    refreshMaterialize(() => {
                        $scope.calculated = true;
                    });

                }, (err) => {
                    console.error(err);
                    $scope.calculated = false;
                });
            };


            $scope.clearData = () => {
                $scope.calculated = false;
            };

            var getTypeEvidences = (evidences) => {
                return Object.keys(evidences[0]).filter(e => e !== "id");
            };

            var refreshMaterialize = (callback) => {
                $timeout(() => {
                    // Activate materialize label
                    $('label').addClass('active');
                    // Activate materialize select fields
                    $('select').material_select();

                    if (callback) {
                        callback();
                    }
                }, 150);
            };

            $scope.overrides = [];
            $scope.overridesReason = {};
            $scope.checkOverride = (id, reason) => {
                $scope.loadingOverrides = true;
                $scope.calculated = false;


                var from = moment.tz($scope.query.period, 'x', $scope.query.tz).toISOString();
                var to = moment.tz($scope.query.period, 'x', $scope.query.tz).add(1, "month").subtract(1, "millisecond").toISOString();

                var typeEvidence = $scope.typeEvidence;
                var data = {
                    scope: {},
                    period: { from: from, to: to },
                    evidences: {},
                    id: Number(id),
                    comment: reason
                }

                data["evidences"][$scope.typeEvidence] = true;

                data = JSON.stringify(data);
                console.log(data);

                evidencesService.updateANS(data).then((response) => {

                    $scope.overrides.push(id);
                    $scope.overridesReason[id] = reason;
                    $scope.reason = "";
                    $scope.loadingOverrides = false;
                    $scope.calculated = true;

                }, (err) => {

                    if (err.status == '400') {
                        document.getElementById("trigger1").click();
                    }

                    console.error(err);
                    $scope.loadingOverrides = false;
                    $scope.calculated = true;
                });
            }

            $scope.undoOverride = (id) => {
                if (confirm("¿Está seguro de que quiere desmarcar el falso positivo? Esta acción no puede deshacerse.")) {
                    $scope.loadingOverrides = true;
                    $scope.calculated = false;

                    var from = moment.tz($scope.query.period, 'x', $scope.query.tz).toISOString();
                    var to = moment.tz($scope.query.period, 'x', $scope.query.tz).add(1, "month").subtract(1, "millisecond").toISOString();

                    var data = {
                        scope: {},
                        period: { from: from, to: to },
                        id: Number(id),
                        evidences: {},
                        comment: $scope.overridesReason[id]
                    }

                    data["evidences"][$scope.typeEvidence] = true;

                    data = JSON.stringify(data);
                    console.log(data);
                    evidencesService.deleteOverride(data).then((response) => {
                        $scope.overrides.splice($scope.overrides.indexOf(id), 1);
                        delete $scope.overridesReason[id];
                        $scope.calculated = true;
                        $scope.loadingOverrides = false;
                    }, (err) => {
                        console.error(err);
                        $scope.loadingOverrides = false;
                        $scope.calculated = true;
                    });


                }
            }

            $scope.checkRegisteredOverride = (id) => {
                var from = moment.tz($scope.query.period, 'x', $scope.query.tz).toISOString();
                var to = moment.tz($scope.query.period, 'x', $scope.query.tz).add(1, "month").subtract(1, "millisecond").toISOString();

                var data = {
                    scope: {},
                    period: { from: from, to: to },
                    id: Number(id),
                    evidences: {},
                }

                data["evidences"][$scope.typeEvidence] = true;

                for (var i = 0; i < $scope.registeredOverridesLength; i++) {
                    var override = $scope.registeredOverrides[i];
                    if (override.id == data.id
                        && override.period.from == data.period.from && override.period.to == data.period.to
                        && override.evidences == override.evidences) {
                        $scope.overridesReason[id] = override.comment;
                        return true;
                    }
                }
                return false;

            }

            $scope.changeCurrentId = (id) => {
                $scope.currentId = id;
                $scope.reason = "";
            }

            $scope.changeCompleteReason = (completeReason) => {
                $scope.completeReason = completeReason;
            }

            refreshMaterialize();

            $scope.refreshPage = () => {
                window.location.reload(true);
            }

            if ($stateParams.agreement && $stateParams.guarantee && $stateParams.period) {
                $scope.calculateReport($scope.query);
                evidencesService.getRegisteredOverrides().then((response) => {
                    $scope.registeredOverrides = response;
                    $scope.registeredOverridesLength = response.length;

                    // var from = moment.tz($scope.query.period, "x", $scope.query.tz).toISOString();
                    // var to = moment.tz($scope.query.period, "x", $scope.query.tz).endOf('month').toISOString();
                    // evidencesService.getBills(from, to).then((bill) => {
                    //     $scope.openBill = bill.state === 'open' ? true : false;
                    // });
                }, (err) => {
                    console.error(err);
                });
            }
        })
    }

}());
