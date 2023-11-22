
'use strict';

const atoms = {
  rowTitle: {
    title: '###GUARANTEE.DESCRIPTION###',
    type: 'row',
    collapsed: false,
    datasource: null,
    gridPos: {
      h: 1,
      w: 24,
      x: 0,
      y: 0
    },
    id: 53,
    panels: []
  },
  gaugeLast5DaysOld: {
    title: 'Mean percentage since the beginning',
    guarantee: '###GUARANTEE.NAME###',
    type: 'gauge',
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        max: 100,
        min: 0,
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'red',
              value: null
            },
            {
              color: 'yellow',
              value: 50
            },
            {
              color: 'green',
              value: 75
            }
          ]
        }
      },
      overrides: []
    },
    gridPos: {
      h: 9,
      w: 4,
      x: 0,
      y: 1
    },
    id: 2,
    options: {
      orientation: 'auto',
      reduceOptions: {
        calcs: [
          'mean'
        ],
        values: false
      },
      showThresholdLabels: false,
      showThresholdMarkers: true
    },
    pluginVersion: '7.0.0',
    targets: [
      {
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'null'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        query: "SELECT mean(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###') AND time < now() AND time >= now() -500d GROUP BY time($__interval) fill(null)",
        rawQuery: true,
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    timeFrom: null,
    timeShift: null
  },
  gaugeLast5Days: {
    title: 'Mean percentage since the beginning',
    guarantee: '###GUARANTEE.NAME###',
    type: 'gauge',
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        max: 100,
        min: 0,
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'red',
              value: null
            },
            {
              color: 'yellow',
              value: 50
            },
            {
              color: 'green',
              value: 75
            }
          ]
        }
      },
      overrides: []
    },
    gridPos: {
      h: 9,
      w: 4,
      x: 0,
      y: 1
    },
    id: 2,
    options: {
      orientation: 'auto',
      reduceOptions: {
        calcs: [
          'mean'
        ],
        values: false
      },
      showThresholdLabels: false,
      showThresholdMarkers: true
    },
    pluginVersion: '7.0.0',
    targets: [
      {
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'null'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        query: "SELECT mean(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###') AND time < now() AND time >= now() -500d GROUP BY time($__interval) fill(null)",
        rawQuery: true,
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    timeFrom: null,
    timeShift: null
  },
  gaugeLastPeriod: {
    title: 'Mean percentage since the beginning',
    guarantee: '###GUARANTEE.NAME###',
    type: 'gauge',
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        max: 100,
        min: 0,
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'red',
              value: null
            },
            {
              color: 'yellow',
              value: 50
            },
            {
              color: 'green',
              value: 75
            }
          ]
        }
      },
      overrides: []
    },
    gridPos: {
      h: 9,
      w: 4,
      x: 0,
      y: 1
    },
    id: 2,
    options: {
      orientation: 'auto',
      reduceOptions: {
        calcs: [
          'mean'
        ],
        values: false
      },
      showThresholdLabels: false,
      showThresholdMarkers: true
    },
    pluginVersion: '7.0.0',
    targets: [
      {
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'null'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        query: "SELECT mean(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###') AND $timeFilter GROUP BY time($__interval) fill(null)",
        rawQuery: true,
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    timeFrom: null,
    timeShift: null
  },
  gaugeLast5DaysNotZero: {
    title: 'Mean percentage since the beginning',
    guarantee: '###GUARANTEE.NAME###',
    type: 'gauge',
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        max: 100,
        min: 0,
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'red',
              value: null
            },
            {
              color: 'yellow',
              value: 50
            },
            {
              color: 'green',
              value: 75
            }
          ]
        }
      },
      overrides: []
    },
    gridPos: {
      h: 9,
      w: 4,
      x: 0,
      y: 1
    },
    id: 2,
    options: {
      orientation: 'auto',
      reduceOptions: {
        calcs: [
          'mean'
        ],
        values: false
      },
      showThresholdLabels: false,
      showThresholdMarkers: true
    },
    pluginVersion: '7.0.0',
    targets: [
      {
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'null'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        query: "SELECT mean(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###' AND \"###METRIC.NOTZERO###\" != 0) AND time < now() AND time >= now() -500d GROUP BY time($__interval) fill(null)",
        rawQuery: true,
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    timeFrom: null,
    timeShift: null,
    transparent: true
  },
  gaugeLastPeriodNotZero: {
    title: 'Period mean percentage',
    guarantee: '###GUARANTEE.NAME###',
    type: 'gauge',
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        max: 100,
        min: 0,
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'red',
              value: null
            },
            {
              color: 'yellow',
              value: 50
            },
            {
              color: 'green',
              value: 75
            }
          ]
        }
      },
      overrides: []
    },
    gridPos: {
      h: 9,
      w: 4,
      x: 0,
      y: 1
    },
    id: 2,
    options: {
      orientation: 'auto',
      reduceOptions: {
        calcs: [
          'mean'
        ],
        values: false
      },
      showThresholdLabels: false,
      showThresholdMarkers: true
    },
    pluginVersion: '7.0.0',
    targets: [
      {
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'null'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        query: "SELECT mean(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###' AND \"###METRIC.NOTZERO###\" != 0) AND $timeFilter GROUP BY time($__interval) fill(null)",
        rawQuery: true,
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    timeFrom: null,
    timeShift: null
  },
  timeGraph: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        links: []
      },
      overrides: []
    },
    fill: 1,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 12,
      x: 0,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 2,
    nullPointMode: 'null',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '8.0.6',
    pointradius: 2,
    points: true,
    renderer: 'flot',
    seriesOverrides: [],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets: [
      {
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'none'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    thresholds: [
      {
        colorMode: 'critical',
        fill: true,
        line: false,
        op: 'lt',
        value: '###GUARANTEE.THRESHOLD###',
        yaxis: 'left'
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        decimals: 0,
        format: 'percent',
        label: '',
        logBase: 1,
        max: '100',
        min: '0',
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  timeGraphMember: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'green',
              value: null
            },
            {
              color: 'red',
              value: 80
            }
          ]
        }
      },
      overrides: []
    },
    fill: 1,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 20,
      x: 4,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 1,
    nullPointMode: 'null',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '7.0.0',
    pointradius: 2,
    points: true,
    renderer: 'flot',
    seriesOverrides: [],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets: [
      {
        groupBy: [
          {
            params: [
              'scope_member'
            ],
            type: 'tag'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          },
          {
            condition: 'AND',
            key: 'scope_member',
            operator: '!=',
            value: ''
          }
        ]
      }
    ],
    thresholds: [
      {
        "colorMode": "critical",
        "fill": true,
        "line": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      },
      {
        "colorMode": "ok",
        "fill": true,
        "line": "###GUARANTEE.OK_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.OK_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    transformations: [
      {
        "id": "renameByRegex",
        "options": {
          "regex": "metrics_values.guaranteeValue {scope_member:",
          "renamePattern": ""
        }
      },
      {
        "id": "renameByRegex",
        "options": {
          "regex": "}",
          "renamePattern": ""
        }
      }
    ],
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  timeGraphMemberNotZero: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'green',
              value: null
            },
            {
              color: 'red',
              value: 80
            }
          ]
        }
      },
      overrides: []
    },
    fill: 1,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 20,
      x: 4,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 1,
    nullPointMode: 'null',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '7.0.0',
    pointradius: 2,
    points: true,
    renderer: 'flot',
    seriesOverrides: [],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets: [
      {
        groupBy: [
          {
            params: [
              'scope_member'
            ],
            type: 'tag'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        query: "SELECT \"guaranteeValue\" FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###' AND \"###METRIC.NOTZERO###\" != 0 AND \"scope_member\" != '') AND $timeFilter GROUP BY \"scope_member\"",
        rawQuery: true,
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          },
          {
            condition: 'AND',
            key: 'scope_member',
            operator: '!=',
            value: ''
          },
          {
            condition: 'AND',
            key: '###METRIC.NOTZERO###',
            operator: '!=',
            value: '0'
          }
        ]
      }
    ],
    thresholds: [
      {
        "colorMode": "critical",
        "fill": true,
        "line": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      },
      {
        "colorMode": "ok",
        "fill": true,
        "line": "###GUARANTEE.OK_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.OK_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    transformations: [
      {
        "id": "renameByRegex",
        "options": {
          "regex": "metrics_values.guaranteeValue {scope_member:",
          "renamePattern": ""
        }
      },
      {
        "id": "renameByRegex",
        "options": {
          "regex": "}",
          "renamePattern": ""
        }
      }
    ],
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  timeGraphMemberGroupBy: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'green',
              value: null
            },
            {
              color: 'red',
              value: 80
            }
          ]
        }
      },
      overrides: []
    },
    fill: 1,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 20,
      x: 4,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 1,
    nullPointMode: 'null',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '7.0.0',
    pointradius: 2,
    points: true,
    renderer: 'flot',
    seriesOverrides: [],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets: [
      {
        groupBy: [
          {
            type: "time",
            params: [
              "###TIME_GRAPH.TIME_INTERVAL###"
            ]
          },
          {
            params: [
              'scope_member'
            ],
            type: 'tag'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              type: "###TIME_GRAPH.AGGREGATION###",
              params: []
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          },
          {
            condition: 'AND',
            key: 'scope_member',
            operator: '!=',
            value: ''
          }
        ]
      }
    ],
    thresholds: [
      {
        "colorMode": "critical",
        "fill": true,
        "line": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      },
      {
        "colorMode": "ok",
        "fill": true,
        "line": "###GUARANTEE.OK_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.OK_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    transformations: [
      {
        "id": "renameByRegex",
        "options": {
          "regex": "metrics_values.sum {scope_member:",
          "renamePattern": ""
        }
      },
      {
        "id": "renameByRegex",
        "options": {
          "regex": "}",
          "renamePattern": ""
        }
      }
    ],
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  timeGraphPercentOld: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'green',
              value: null
            },
            {
              color: 'red',
              value: 80
            }
          ]
        }
      },
      overrides: []
    },
    fill: 1,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 20,
      x: 0,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 1,
    nullPointMode: 'null',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '7.0.0',
    pointradius: 2,
    points: true,
    renderer: 'flot',
    seriesOverrides: [
      {
        alias: 'Team',
        color: '#3274D9'
      },
      {
        alias: 'Class mean',
        color: 'rgb(155, 155, 155)',
        points: false
      }
    ],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets: [
      {
        alias: 'Team',
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'none'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      },
      {
        alias: 'Class mean',
        groupBy: [
          {
            params: [
              '$__interval'
            ],
            type: 'time'
          },
          {
            params: [
              'none'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        refId: 'B',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            },
            {
              params: [],
              type: 'mean'
            }
          ]
        ],
        tags: [
          {
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          },
          {
            condition: 'AND',
            key: 'scope_class',
            operator: '=',
            value: '###AGREEMENT.SCOPE.CLASS###'
          }
        ]
      }
    ],
    thresholds: [
      {
        colorMode: 'critical',
        fill: true,
        line: false,
        op: 'lt',
        value: '###GUARANTEE.THRESHOLD###',
        yaxis: 'left'
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: '100',
        min: '0',
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  timeGraphPercent: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'green',
              value: null
            },
            {
              color: 'red',
              value: 80
            }
          ]
        }
      },
      overrides: []
    },
    fill: 1,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 20,
      x: 0,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 1,
    nullPointMode: 'connected',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '7.0.0',
    pointradius: 2,
    points: true,
    renderer: 'flot',
    seriesOverrides: [
      {
        alias: 'Team',
        color: '#3274D9'
      },
      {
        alias: 'Class mean',
        color: 'rgb(155, 155, 155)',
        points: false
      }
    ],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets:
      [
        {
          alias: 'Team',
          groupBy: [],
          measurement: 'metrics_values',
          orderByTime: 'ASC',
          policy: 'autogen',
          query: "SELECT \"guaranteeValue\" FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###') AND $timeFilter",
          rawQuery: true,
          refId: 'A',
          resultFormat: 'time_series',
          select: [
            [
              {
                params: [
                  'guaranteeValue'
                ],
                type: 'field'
              }
            ]
          ],
          tags: []
        },
        {
          alias: 'Class mean',
          groupBy: [],
          orderByTime: 'ASC',
          policy: 'autogen',
          query: "SELECT MEAN(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"scope_class\" = '###AGREEMENT.SCOPE.CLASS###' AND \"id\" = '###GUARANTEE.NAME###') AND $timeFilter GROUP BY time(24h)",
          rawQuery: true,
          refId: 'B',
          resultFormat: 'time_series',
          select: [
            [
              {
                params: [
                  'value'
                ],
                type: 'field'
              },
              {
                params: [],
                type: 'mean'
              }
            ]
          ],
          tags: []
        }
      ],
    thresholds: [
      {
        colorMode: 'critical',
        fill: true,
        line: false,
        op: 'lt',
        value: '###GUARANTEE.THRESHOLD###',
        yaxis: 'left'
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: '100',
        min: '0',
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  timeGraphPercentNotZero: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'green',
              value: null
            },
            {
              color: 'red',
              value: 80
            }
          ]
        }
      },
      overrides: []
    },
    fill: 1,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 20,
      x: 0,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 1,
    nullPointMode: 'connected',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '7.0.0',
    pointradius: 2,
    points: true,
    renderer: 'flot',
    seriesOverrides: [
      {
        alias: 'Team',
        color: '#3274D9'
      },
      {
        alias: 'Class mean',
        color: 'rgb(155, 155, 155)',
        points: false
      }
    ],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets:
      [
        {
          alias: 'Team',
          groupBy: [],
          measurement: 'metrics_values',
          orderByTime: 'ASC',
          policy: 'autogen',
          query: "SELECT \"guaranteeValue\" FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###' AND \"###METRIC.NOTZERO###\" != 0) AND $timeFilter",
          rawQuery: true,
          refId: 'A',
          resultFormat: 'time_series',
          select: [
            [
              {
                params: [
                  'guaranteeValue'
                ],
                type: 'field'
              }
            ]
          ],
          tags: []
        },
        {
          alias: 'Class mean',
          groupBy: [],
          orderByTime: 'ASC',
          policy: 'autogen',
          query: "SELECT MEAN(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"scope_class\" = '###AGREEMENT.SCOPE.CLASS###' AND \"id\" = '###GUARANTEE.NAME###' AND \"###METRIC.NOTZERO###\" != 0) AND $timeFilter GROUP BY time(24h)",
          rawQuery: true,
          refId: 'B',
          resultFormat: 'time_series',
          select: [
            [
              {
                params: [
                  'value'
                ],
                type: 'field'
              },
              {
                params: [],
                type: 'mean'
              }
            ]
          ],
          tags: []
        }
      ],
    thresholds: [
      {
        "colorMode": "critical",
        "fill": true,
        "###LINE_CRITICAL###": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      },
      {
        "colorMode": "ok",
        "fill": true,
        "###LINE_OK###": "###GUARANTEE.OK_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.OK_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: '100',
        min: '0',
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  timeGraphPercentNotZeroMember: {
    title: '###TIME_GRAPH.TITLE###',
    guarantee: '###GUARANTEE.NAME###',
    type: 'graph',
    aliasColors: {},
    bars: false,
    dashLength: 10,
    dashes: false,
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {},
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'green',
              value: null
            },
            {
              color: 'red',
              value: 80
            }
          ]
        }
      },
      overrides: []
    },
    fill: 0,
    fillGradient: 0,
    gridPos: {
      h: 9,
      w: 20,
      x: 0,
      y: 1
    },
    hiddenSeries: false,
    id: 4,
    legend: {
      avg: false,
      current: false,
      max: false,
      min: false,
      show: true,
      total: false,
      values: false
    },
    lines: true,
    linewidth: 1,
    nullPointMode: 'connected',
    options: {
      dataLinks: []
    },
    percentage: false,
    pluginVersion: '7.0.0',
    pointradius: 3,
    points: true,
    renderer: 'flot',
    seriesOverrides: [
      {
        alias: 'Class mean',
        color: 'rgb(155, 155, 155)',
        points: false
      }
    ],
    spaceLength: 10,
    stack: false,
    steppedLine: false,
    targets:
      [
        {
          measurement: 'metrics_values',
          orderByTime: 'ASC',
          policy: 'autogen',
          query: "SELECT \"guaranteeValue\" FROM \"autogen\".\"metrics_values\" WHERE (\"agreement\" = '###AGREEMENT.ID###' AND \"id\" = '###GUARANTEE.NAME###' AND \"###METRIC.NOTZERO###\" != 0) AND $timeFilter GROUP BY \"scope_member\"",
          rawQuery: true,
          refId: 'A',
          resultFormat: 'time_series',
          select: [
            [
              {
                params: [
                  'guaranteeValue'
                ],
                type: 'field'
              }
            ]
          ],
          tags: []
        },
        {
          alias: 'Class mean',
          groupBy: [],
          orderByTime: 'ASC',
          policy: 'autogen',
          query: "SELECT MEAN(\"guaranteeValue\") FROM \"autogen\".\"metrics_values\" WHERE (\"scope_class\" = '###AGREEMENT.SCOPE.CLASS###' AND \"id\" = '###GUARANTEE.NAME###' AND \"###METRIC.NOTZERO###\" != 0) AND $timeFilter GROUP BY time(24h)",
          rawQuery: true,
          refId: 'B',
          resultFormat: 'time_series',
          select: [
            [
              {
                params: [
                  'value'
                ],
                type: 'field'
              },
              {
                params: [],
                type: 'mean'
              }
            ]
          ],
          tags: []
        }
      ],
    thresholds: [
      {
        "colorMode": "critical",
        "fill": true,
        "###LINE_CRITICAL###": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      },
      {
        "colorMode": "ok",
        "fill": true,
        "###LINE_OK###": "###GUARANTEE.OK_THRESHOLD_SIGN_LINE###",
        "op": "###GUARANTEE.OK_THRESHOLD_SIGN###",
        "value": '###GUARANTEE.THRESHOLD###',
        "yaxis": "left"
      }
    ],
    timeFrom: null,
    timeRegions: [],
    timeShift: null,
    transformations: [
      {
        "id": "renameByRegex",
        "options": {
          "regex": "metrics_values.guaranteeValue {scope_member:",
          "renamePattern": ""
        }
      },
      {
        "id": "renameByRegex",
        "options": {
          "regex": "}",
          "renamePattern": ""
        }
      }
    ],
    tooltip: {
      shared: true,
      sort: 0,
      value_type: 'individual'
    },
    xaxis: {
      buckets: null,
      mode: 'time',
      name: null,
      show: true,
      values: []
    },
    yaxes: [
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: '100',
        min: '0',
        show: true
      },
      {
        format: 'short',
        label: null,
        logBase: 1,
        max: null,
        min: null,
        show: true
      }
    ],
    yaxis: {
      align: false,
      alignLevel: null
    }
  },
  scatter: {
    title: 'Correlation for all teams',
    type: 'governify-scatterplot',
    guarantee: '###GUARANTEE.NAME###',
    datasource: 'InfluxDB',
    description: '',
    fieldConfig: {
      defaults: {
        custom: {}
      },
      overrides: []
    },
    gridPos: {
      h: 9,
      w: 4,
      x: 20,
      y: 1
    },
    id: 44,
    options: {
      axisXmetric: '###METRIC.XAXIS###',
      axisYmetric: '###METRIC.YAXIS###',
      groupBy: 'scope_project',
      guaranteeFormula: 'x - y = 0',
      highlightTeam: '###AGREEMENT.PROJECT###',
      seriesCountSize: 'sm',
      showSeriesCount: false,
      tooltipText: 'Value',
      threshold: '###GUARANTEE.THRESHOLD###',
      xAxisTitle: '###METRIC.XAXIS###',
      yAxisTitle: '###METRIC.YAXIS###'
    },
    targets: [
      {
        groupBy: [
          {
            params: [
              'scope_project'
            ],
            type: 'tag'
          },
          {
            params: [
              '0'
            ],
            type: 'fill'
          }
        ],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        refId: 'A',
        resultFormat: 'table',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            }
          ],
          [
            {
              params: [
                '###METRIC.XAXIS###'
              ],
              type: 'field'
            }
          ],
          [
            {
              params: [
                '###METRIC.YAXIS###'
              ],
              type: 'field'
            }
          ]
        ],
        tags: [
          {
            key: 'scope_class',
            operator: '=',
            value: '###AGREEMENT.SCOPE.CLASS###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    timeFrom: null,
    timeShift: null
  },
  valuesInTime: {
    datasource: 'InfluxDB',
    fieldConfig: {
      defaults: {
        custom: {
          align: 'center',
          displayMode: 'color-background'
        },
        mappings: [],
        thresholds: {
          mode: 'absolute',
          steps: [
            {
              color: 'semi-dark-red',
              value: null
            },
            {
              color: 'semi-dark-green',
              value: '###GUARANTEE.THRESHOLD###'
            }
          ]
        },
        unit: 'percent'
      },
      overrides: []
    },
    gridPos: {
      h: 9,
      w: 12,
      x: 12,
      y: 1
    },
    id: 4,
    options: {
      showHeader: true
    },
    pluginVersion: '7.0.0',
    targets: [
      {
        groupBy: [],
        measurement: 'metrics_values',
        orderByTime: 'ASC',
        policy: 'autogen',
        refId: 'A',
        resultFormat: 'time_series',
        select: [
          [
            {
              params: [
                'guaranteeValue'
              ],
              type: 'field'
            }
          ]
        ],
        tags: [
          {
            key: 'agreement',
            operator: '=',
            value: '###AGREEMENT.ID###'
          },
          {
            condition: 'AND',
            key: 'id',
            operator: '=',
            value: '###GUARANTEE.NAME###'
          }
        ]
      }
    ],
    timeFrom: null,
    timeShift: null,
    title: 'Tabla de % ###TIME_GRAPH.TITLE###',
    type: 'table'
  },
  htmlLink: {
    content: "<script>\n setTimeout(function(){document.getElementById('daySelector').style.filter = 'invert(1)'; document.styleSheets[0].insertRule('::-webkit-calendar-picker-indicator {filter: invert(1);}',1);},1000);\n</script>\n <div style=\"font-size: 34px; color: white; max-width: 90%;text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, .5px .5px #000, -.5px -.5px 0 #000, .5px -.5px 0 #000, -.5px .5px 0 #000;;\">\n<center>\n###TITLE###\n\n</center>\n\n</div>\n<div style=\"font-size: 34px; color: black; margin-top: -60px; max-width: 15%; float: right;  margin-right: 20px;\">\n<button style=\"font-size: 18px; color: #000000\" onclick=\"location.href = location.href.replace('###OLDVIEW###', '###NEWVIEW###')\">\n###BUTTONTEXT###\n</button>\n</div>",
    gridPos: {
      h: 2,
      w: 24,
      x: 0,
      y: 0
    },
    id: 30,
    mode: 'html',
    type: 'text'

  },
  htmlGithub: {
    content: "<div\r\n    style=\"padding-left: 19%;font-size: 34px; color: white; max-width: 80%;text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, .5px .5px #000, -.5px -.5px 0 #000, .5px -.5px 0 #000, -.5px .5px 0 #000;;\">\r\n    <center>\r\n        ###TITLE###\r\n    <\/center>\r\n<\/div>\r\n<div style=\"font-size: 34px; color: black; margin-top: -55px; max-width: 30%; float: right;  margin-right: 10px;\">\r\n    <a href=\"https:\/\/www.github.com\/%%%GITHUB_SLUG%%%\" target=\"_blank\"><button style=\"font-size: 18px; color: #000000\">GitHub Repo<\/button><\/a>\r\n<\/div>",
    gridPos: {
      h: 2,
      w: 24,
      x: 0,
      y: 0
    },
    id: 30,
    mode: 'html',
    type: 'text'
  },
  htmlGithubStates: {
    content: "<div style=\"height: inherit;display: flex;align-items: center;justify-content: space-between;margin: 0px 10px;\">\r\n    <a style='width: 5%' href=\"https://states-exporter.bluejay.governify.io\/api\/v1\/states?agreementId=###AGREEMENT.ID###&amp;format=csv&amp;download\" target=\"_blank\"><img src='https://www.freeiconspng.com/uploads/cloud-download-icon-0.png' alt='Download states' /><\/a>\r\n    <div style=\"font-size: 34px;color: white;\">\r\n        PSG2-2223 Dashboard\r\n    <\/div>\r\n    <a href=\"https://www.github.com/%%%GITHUB_SLUG%%%\" target=\"_blank\"><button style=\"font-size: 18px;color: #000000;\">GitHub Repo<\/button><\/a>\r\n<\/div>",
    gridPos: {
      h: 2,
      w: 24,
      x: 0,
      y: 0
    },
    id: 30,
    mode: 'html',
    type: 'text'
  },
  htmlLinkGithub: {
    content: "<script>\n setTimeout(function(){document.getElementById('daySelector').style.filter = 'invert(1)'; document.styleSheets[0].insertRule('::-webkit-calendar-picker-indicator {filter: invert(1);}',1);},1000);\n</script>\n <div style=\"padding-left: 19%;font-size: 34px; color: white; max-width: 80%;text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, .5px .5px #000, -.5px -.5px 0 #000, .5px -.5px 0 #000, -.5px .5px 0 #000;;\">\n<center>\n###TITLE###\n\n</center>\n\n</div>\n<div style=\"font-size: 34px; color: black; margin-top: -55px; max-width: 30%; float: right;  margin-right: 10px;\">\n<a href=\"https://www.github.com/%%%GITHUB_SLUG%%%\" target=\"_blank\"><button style=\"font-size: 18px; color: #000000\">\nGitHub Repo\n</button></a>\n<button style=\"font-size: 18px; color: #000000\" onclick=\"location.href = location.href.replace('###OLDVIEW###', '###NEWVIEW###')\">\n###BUTTONTEXT###\n</button>\n</div>",
    gridPos: {
      h: 2,
      w: 24,
      x: 0,
      y: 0
    },
    id: 30,
    mode: 'html',
    type: 'text'
  }
};

function addAtom(atom, width = 24, height = 9, x = undefined, options = {}) {
  const result = { ...atoms[atom] };
  result.gridPos = { ...result.gridPos };
  result.gridPos.w = width;
  result.gridPos.h = height;
  if (x != undefined) {
    result.gridPos.x = x;
  }
  // TODO - Nested objects
  for (const [key, value] of Object.entries(options)) {
    result[key] = value;
  }

  return result;
}

const blocks = {
  correlated: {
    config: {
      height: 8
    },
    panels: [
      {
        collapsed: false,
        datasource: null,
        gridPos: {
          h: 1,
          w: 24,
          x: 0,
          y: 0
        },
        id: '###PANEL.ID###',
        panels: [],
        title: '###GUARANTEE.DESCRIPTION###',
        type: 'row'
      },
      {
        title: 'Correlation for all teams',
        datasource: 'InfluxDB',
        description: '',
        fieldConfig: {
          defaults: {
            custom: {}
          },
          overrides: []
        },
        gridPos: {
          h: 10,
          w: 6,
          x: 0,
          y: 1
        },
        id: 44,
        options: {
          axisXmetric: '###METRIC.XAXIS###',
          axisYmetric: '###METRIC.YAXIS###',
          groupBy: 'scope_project',
          guaranteeFormula: 'x - y = 0',
          highlightTeam: '###AGREEMENT.PROJECT###',
          seriesCountSize: 'sm',
          showSeriesCount: false,
          tooltipText: 'Value',
          xAxisTitle: '###METRIC.XAXIS###',
          yAxisTitle: '###METRIC.YAXIS###'
        },
        targets: [
          {
            groupBy: [
              {
                params: [
                  'scope_project'
                ],
                type: 'tag'
              },
              {
                params: [
                  '0'
                ],
                type: 'fill'
              }
            ],
            measurement: 'metrics_values',
            orderByTime: 'ASC',
            policy: 'autogen',
            refId: 'A',
            resultFormat: 'table',
            select: [
              [
                {
                  params: [
                    'guaranteeValue'
                  ],
                  type: 'field'
                }
              ],
              [
                {
                  params: [
                    '###METRIC.XAXIS###'
                  ],
                  type: 'field'
                }
              ],
              [
                {
                  params: [
                    '###METRIC.YAXIS###'
                  ],
                  type: 'field'
                }
              ]
            ],
            tags: [
              {
                //      "key": "scope_class",
                //      "operator": "=",
                //      "value": "###AGREEMENT.SCOPE.CLASS###"
                //    },
                //     {
                //    "condition": "AND",
                key: 'id',
                operator: '=',
                value: '###GUARANTEE.NAME###'
              }
            ]
          }
        ],
        timeFrom: null,
        timeShift: null,
        type: 'governify-scatterplot'
      },
      {
        title: 'Correlation values for all teams',
        datasource: 'InfluxDB',
        description: '',
        fieldConfig: {
          defaults: {
            custom: {
              align: null
            },
            mappings: [],
            thresholds: {
              mode: 'absolute',
              steps: [
                {
                  color: 'green',
                  value: null
                },
                {
                  color: 'red',
                  value: '###GUARANTEE.THRESHOLD###'
                }
              ]
            }
          },
          overrides: []
        },
        gridPos: {
          h: 10,
          w: 8,
          x: 6,
          y: 1
        },
        id: 48,
        options: {
          showHeader: true
        },
        pluginVersion: '7.0.0',
        targets: [
          {
            groupBy: [
              {
                params: [
                  'scope_project'
                ],
                type: 'tag'
              }
            ],
            measurement: 'metrics_values',
            orderByTime: 'ASC',
            policy: 'autogen',
            refId: 'A',
            resultFormat: 'table',
            select: [
              [
                {
                  params: [
                    '###METRIC.XAXIS###'
                  ],
                  type: 'field'
                },
                {
                  params: [],
                  type: 'sum'
                }
              ],
              [
                {
                  params: [
                    '###METRIC.YAXIS###'
                  ],
                  type: 'field'
                },
                {
                  params: [],
                  type: 'sum'
                }
              ]
            ],
            tags: [
              {
                key: 'id',
                operator: '=',
                value: '###GUARANTEE.NAME###'
              }
            ]
          }
        ],
        timeFrom: null,
        timeShift: null,
        transformations: [
          {
            id: 'organize',
            options: {
              excludeByName: {
                Time: true
              },
              indexByName: {},
              renameByName: {
                scope_project: 'Project',
                sum: 'Finished stories',
                sum_1: 'Correlated Pull Requests'
              }
            }
          }
        ],
        type: 'table'
      },
      {
        title: 'Evolution of values through time for this team',
        aliasColors: {},
        bars: false,
        dashLength: 10,
        dashes: false,
        datasource: 'InfluxDB',
        fieldConfig: {
          defaults: {
            custom: {}
          },
          overrides: []
        },
        fill: 1,
        fillGradient: 0,
        gridPos: {
          h: 10,
          w: 10,
          x: 14,
          y: 1
        },
        hiddenSeries: false,
        id: 46,
        legend: {
          avg: false,
          current: false,
          max: false,
          min: false,
          show: true,
          total: false,
          values: false
        },
        lines: true,
        linewidth: 1,
        nullPointMode: 'null',
        options: {
          dataLinks: []
        },
        percentage: false,
        pointradius: 2,
        points: false,
        renderer: 'flot',
        seriesOverrides: [],
        spaceLength: 10,
        stack: false,
        steppedLine: false,
        targets: [
          {
            groupBy: [],
            measurement: 'metrics_values',
            orderByTime: 'ASC',
            policy: 'default',
            refId: 'A',
            resultFormat: 'table',
            select: [
              [
                {
                  params: [
                    '###METRIC.XAXIS###'
                  ],
                  type: 'field'
                }
              ],
              [
                {
                  params: [
                    '###METRIC.YAXIS###'
                  ],
                  type: 'field'
                }
              ]
            ],
            tags: [
              {
                key: 'id',
                operator: '=',
                value: '###GUARANTEE.NAME###'
              }
            ]
          }
        ],
        thresholds: [],
        timeFrom: null,
        timeRegions: [],
        timeShift: null,
        tooltip: {
          shared: true,
          sort: 0,
          value_type: 'individual'
        },
        transformations: [
          {
            id: 'organize',
            options: {
              excludeByName: {},
              indexByName: {},
              renameByName: {
                '###METRIC.XAXIS###': '###METRIC.XAXIS###',
                '###METRIC.YAXIS###': '###METRIC.YAXIS###'
              }
            }
          }
        ],
        type: 'graph',
        xaxis: {
          buckets: null,
          mode: 'time',
          name: null,
          show: true,
          values: []
        },
        yaxes: [
          {
            format: 'short',
            label: null,
            logBase: 1,
            max: null,
            min: null,
            show: true
          },
          {
            format: 'short',
            label: null,
            logBase: 1,
            max: null,
            min: null,
            show: true
          }
        ],
        yaxis: {
          align: false,
          alignLevel: null
        }
      }
    ]
  },
  'time-graph': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphPercent', 12),
      addAtom('valuesInTime', 12)
    ]

  },
  'time-graph-count': {
    config: {
      height: 8
    },
    panels: [
      {
        datasource: 'InfluxDB',
        fieldConfig: {
          defaults: {
            custom: {
              align: 'center',
              displayMode: 'color-background'
            },
            mappings: [],
            thresholds: {
              mode: 'absolute',
              steps: [
                {
                  color: 'rgb(127, 9, 11)',
                  value: null
                },
                {
                  color: 'rgb(30, 104, 11)',
                  value: '###GUARANTEE.THRESHOLD###'
                }
              ]
            },
            unit: 'none'
          },
          overrides: []
        },
        gridPos: {
          h: 8,
          w: 5,
          x: 19,
          y: 11
        },
        id: 4,
        options: {
          showHeader: true
        },
        pluginVersion: '7.0.0',
        targets: [
          {
            groupBy: [],
            measurement: 'metrics_values',
            orderByTime: 'ASC',
            policy: 'autogen',
            refId: 'A',
            resultFormat: 'time_series',
            select: [
              [
                {
                  params: [
                    'guaranteeValue'
                  ],
                  type: 'field'
                }
              ]
            ],
            tags: [
              {
                key: 'agreement',
                operator: '=',
                value: '###AGREEMENT.ID###'
              },
              {
                condition: 'AND',
                key: 'id',
                operator: '=',
                value: '###GUARANTEE.NAME###'
              }
            ]
          }
        ],
        timeFrom: null,
        timeShift: null,
        title: 'Values in time',
        type: 'table'
      },
      {
        collapsed: false,
        datasource: null,
        gridPos: {
          h: 1,
          w: 24,
          x: 0,
          y: 19
        },
        id: 24,
        panels: [],
        title: '###GUARANTEE.DESCRIPTION###',
        type: 'row'
      },
      {
        aliasColors: {},
        bars: false,
        dashLength: 10,
        dashes: false,
        datasource: 'InfluxDB',
        fieldConfig: {
          defaults: {
            custom: {}
          },
          overrides: []
        },
        fill: 1,
        fillGradient: 0,
        gridPos: {
          h: 8,
          w: 19,
          x: 0,
          y: 20
        },
        hiddenSeries: false,
        id: 20,
        legend: {
          avg: false,
          current: false,
          max: false,
          min: false,
          show: true,
          total: false,
          values: false
        },
        lines: true,
        linewidth: 1,
        nullPointMode: 'null',
        options: {
          dataLinks: []
        },
        percentage: false,
        pointradius: 2,
        points: true,
        renderer: 'flot',
        seriesOverrides: [],
        spaceLength: 10,
        stack: false,
        steppedLine: false,
        targets: [
          {
            alias: '',
            groupBy: [
              {
                params: [
                  '$__interval'
                ],
                type: 'time'
              },
              {
                params: [
                  'none'
                ],
                type: 'fill'
              }
            ],
            measurement: 'metrics_values',
            orderByTime: 'ASC',
            policy: 'autogen',
            refId: 'A',
            resultFormat: 'time_series',
            select: [
              [
                {
                  params: [
                    'guaranteeValue'
                  ],
                  type: 'field'
                },
                {
                  params: [],
                  type: 'mean'
                }
              ]
            ],
            tags: [
              {
                key: 'agreement',
                operator: '=',
                value: '###AGREEMENT.ID###'
              },
              {
                condition: 'AND',
                key: 'id',
                operator: '=',
                value: '###GUARANTEE.NAME###'
              }
            ]
          }
        ],
        thresholds: [
          {
            "colorMode": "critical",
            "fill": true,
            "line": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###",
            "op": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN###",
            "value": '###GUARANTEE.THRESHOLD###',
            "yaxis": "left"
          },
          {
            "colorMode": "ok",
            "fill": true,
            "line": "###GUARANTEE.OK_THRESHOLD_SIGN_LINE###",
            "op": "###GUARANTEE.OK_THRESHOLD_SIGN###",
            "value": '###GUARANTEE.THRESHOLD###',
            "yaxis": "left"
          }
        ],
        timeFrom: null,
        timeRegions: [],
        timeShift: null,
        title: '###TIME_GRAPH.TITLE###',
        tooltip: {
          shared: true,
          sort: 0,
          value_type: 'individual'
        },
        type: 'graph',
        xaxis: {
          buckets: null,
          mode: 'time',
          name: null,
          show: true,
          values: []
        },
        yaxes: [
          {
            format: 'short',
            label: null,
            logBase: 1,
            max: null,
            min: 0,
            show: true
          },
          {
            format: 'short',
            label: null,
            logBase: 1,
            max: null,
            min: null,
            show: true
          }
        ],
        yaxis: {
          align: false,
          alignLevel: null
        }
      }]
  },
  'time-graph-count-groupby': {
    config: {
      height: 8
    },
    panels: [
      {
        datasource: 'InfluxDB',
        fieldConfig: {
          defaults: {
            custom: {
              align: 'center',
              displayMode: 'color-background'
            },
            mappings: [],
            thresholds: {
              mode: 'absolute',
              steps: [
                {
                  color: 'rgb(127, 9, 11)',
                  value: null
                },
                {
                  color: 'rgb(30, 104, 11)',
                  value: '###GUARANTEE.THRESHOLD###'
                }
              ]
            },
            unit: 'none'
          },
          overrides: []
        },
        gridPos: {
          h: 8,
          w: 5,
          x: 19,
          y: 11
        },
        id: 4,
        options: {
          showHeader: true
        },
        pluginVersion: '7.0.0',
        targets: [
          {
            groupBy: [],
            measurement: 'metrics_values',
            orderByTime: 'ASC',
            policy: 'autogen',
            refId: 'A',
            resultFormat: 'time_series',
            select: [
              [
                {
                  params: [
                    'guaranteeValue'
                  ],
                  type: 'field'
                }
              ]
            ],
            tags: [
              {
                key: 'agreement',
                operator: '=',
                value: '###AGREEMENT.ID###'
              },
              {
                condition: 'AND',
                key: 'id',
                operator: '=',
                value: '###GUARANTEE.NAME###'
              }
            ]
          }
        ],
        timeFrom: null,
        timeShift: null,
        title: 'Values in time',
        type: 'table'
      },
      {
        collapsed: false,
        datasource: null,
        gridPos: {
          h: 1,
          w: 24,
          x: 0,
          y: 19
        },
        id: 24,
        panels: [],
        title: '###GUARANTEE.DESCRIPTION###',
        type: 'row'
      },
      {
        aliasColors: {},
        bars: false,
        dashLength: 10,
        dashes: false,
        datasource: 'InfluxDB',
        fieldConfig: {
          defaults: {
            custom: {}
          },
          overrides: []
        },
        fill: 1,
        fillGradient: 0,
        gridPos: {
          h: 8,
          w: 19,
          x: 0,
          y: 20
        },
        hiddenSeries: false,
        id: 20,
        legend: {
          avg: false,
          current: false,
          max: false,
          min: false,
          show: true,
          total: false,
          values: false
        },
        lines: true,
        linewidth: 1,
        nullPointMode: 'null',
        options: {
          dataLinks: []
        },
        percentage: false,
        pointradius: 2,
        points: true,
        renderer: 'flot',
        seriesOverrides: [],
        spaceLength: 10,
        stack: false,
        steppedLine: false,
        targets: [
          {
            alias: '',
            groupBy: [
              {
                params: [
                  '###TIME_GRAPH.TIME_INTERVAL###'
                ],
                type: 'time'
              },
              {
                params: [
                  'none'
                ],
                type: 'fill'
              }
            ],
            measurement: 'metrics_values',
            orderByTime: 'ASC',
            policy: 'autogen',
            refId: 'A',
            resultFormat: 'time_series',
            select: [
              [
                {
                  params: [
                    'guaranteeValue'
                  ],
                  type: 'field'
                },
                {
                  params: [],
                  type: 'mean'
                }
              ]
            ],
            tags: [
              {
                key: 'agreement',
                operator: '=',
                value: '###AGREEMENT.ID###'
              },
              {
                condition: 'AND',
                key: 'id',
                operator: '=',
                value: '###GUARANTEE.NAME###'
              }
            ]
          }
        ],
        thresholds: [
          {
            "colorMode": "critical",
            "fill": true,
            "line": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###",
            "op": "###GUARANTEE.CRITICAL_THRESHOLD_SIGN###",
            "value": '###GUARANTEE.THRESHOLD###',
            "yaxis": "left"
          },
          {
            "colorMode": "ok",
            "fill": true,
            "line": "###GUARANTEE.OK_THRESHOLD_SIGN_LINE###",
            "op": "###GUARANTEE.OK_THRESHOLD_SIGN###",
            "value": '###GUARANTEE.THRESHOLD###',
            "yaxis": "left"
          }
        ],
        timeFrom: null,
        timeRegions: [],
        timeShift: null,
        title: '###TIME_GRAPH.TITLE###',
        tooltip: {
          shared: true,
          sort: 0,
          value_type: 'individual'
        },
        type: 'graph',
        xaxis: {
          buckets: null,
          mode: 'time',
          name: null,
          show: true,
          values: []
        },
        yaxes: [
          {
            format: 'short',
            label: null,
            logBase: 1,
            max: null,
            min: 0,
            show: true
          },
          {
            format: 'short',
            label: null,
            logBase: 1,
            max: null,
            min: null,
            show: true
          }
        ],
        yaxis: {
          align: false,
          alignLevel: null
        }
      }]
  },
  'time-graph-notZero': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphPercentNotZero', 12),
      addAtom('valuesInTime', 12)
    ]

  },
  'time-graph2': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphPercent')
    ]

  },
  'time-graph2-notZero': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphPercentNotZero')
    ]

  },
  'time-graph2-member': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphMember')
    ]
  },
  'time-graph2-member-notZero': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphMemberNotZero')
    ]
  },
  'time-graph2-member-groupby': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphMemberGroupBy')
    ]

  },
  'gauge-time-correlation': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('gaugeLast5Days', 4),
      addAtom('timeGraphPercent', 14, 9, 4),
      addAtom('scatter', 6)
    ]
  },
  'gauge-time-correlation-notZero': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('gaugeLast5DaysNotZero', 4),
      addAtom('timeGraphPercentNotZero', 14, 9, 4),
      addAtom('scatter', 6)
    ]
  },
  'gauge-period-time-correlation-notZero': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('gaugeLast5DaysNotZero', 3, 6),
      addAtom('gaugeLastPeriodNotZero', 4, 9, 3),
      addAtom('timeGraphPercentNotZero', 11.5, 9, 7),
      addAtom('scatter', 5.5,9)
    ]
  },
  'gauge-period-time-correlation-notZero-member': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('gaugeLast5DaysNotZero', 3, 6.2),
      addAtom('gaugeLastPeriodNotZero', 4, 9, 3),
      addAtom('timeGraphPercentNotZero', 11.5, 9, 7),
      addAtom('scatter', 5.5,9)
    ]
  },
  'gauge-time': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('gaugeLast5Days', 4),
      addAtom('timeGraphPercent', 20, 9, 4)
    ]
  },
  'gauge-period-time': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('gaugeLast5Days', 4),
      addAtom('gaugeLastPeriod', 4, 9, 4),
      addAtom('timeGraphPercent', 16, 9, 8)
    ]
  },
  'gauge-time-notZero': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('gaugeLast5DaysNotZero', 4),
      addAtom('timeGraphPercentNotZero', 20, 9, 4)
    ]
  },
  'time-gauge': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphPercent', 20, 9, 0),
      addAtom('gaugeLast5Days', 4, 9, 20)
    ]
  },
  'time-gauge-notZero': {
    config: {
      height: 8
    },
    panels: [
      addAtom('rowTitle'),
      addAtom('timeGraphPercentNotZero', 20, 9, 0),
      addAtom('gaugeLast5DaysNotZero', 4, 9, 20)
    ]
  },
  gauge: {
    config: {
      height: 9,
      width: 8,
      fillRow: true
    },
    panels: [
      addAtom('gaugeLast5Days', 8, 9, undefined, { title: '###GUARANTEE.DESCRIPTION###' })
    ]
  },
  'gauge-notZero': {
    config: {
      height: 9,
      width: 8,
      fillRow: true
    },
    panels: [
      addAtom('gaugeLast5DaysNotZero', 8, 9, undefined, { title: '###GUARANTEE.DESCRIPTION###' })
    ]
  },
  'divider-changer': {
    config: {
      height: 2
    },
    panels: [
      addAtom('htmlLink', 24, 2)
    ]
  },
  'divider-github': {
    config: {
      height: 2
    },
    panels: [
      addAtom('htmlGithub', 24, 2)
    ]
  },
  'divider-github-states': {
    config: {
      height: 2
    },
    panels: [
      addAtom('htmlGithubStates', 24, 2)
    ]
  },
  'divider-changer-github': {
    config: {
      height: 2
    },
    panels: [
      addAtom('htmlLinkGithub', 24, 2)
    ]
  }
};

function sortBlockCompare(block1, block2) {
  if ((block2.order & !block1.order) || (block1.order > block2.order)) {
    return 1;
  } else if ((block1.order & !block2.order) || (block2.order > block1.order)) {
    return -1;
  }
  return 0;
}

module.exports.default = (jsonDashboard, agreement, dashboardName) => {
  let modifiedDashboard = { ...jsonDashboard };
  var agreementId = agreement.id;
  var agreementProject = agreementId.replace('tpa-', '');
  var dashboardConfig = agreement.context.definitions.dashboards[dashboardName].config;
  var currentXLocation = 0;
  var currentYLocation = 0;
  var currentPanelId = 0;

  // Each block configured in the agreement should be added with its configuration to the dashboard.
  Object.entries(dashboardConfig.blocks).sort((a, b) => a[0] - b[0]).forEach(function ([_, block]) {
    var newPanels = [...blocks[block.type].panels];

    if (block.type === 'correlated' || block.type === 'gauge-time-correlation' || block.type === 'gauge-time-correlation-notZero' || block.type === 'gauge-period-time-correlation-notZero' || block.type === 'gauge-period-time-correlation-notZero-member') {
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###METRIC.XAXIS###/g, block.config['x-axis-metric']));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###METRIC.YAXIS###/g, block.config['y-axis-metric']));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###METRIC.NOTZERO###/g, block.config['not-zero-metric']));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###AGREEMENT.PROJECT###/g, agreementProject));
    } else if (block.type === 'divider-changer' || block.type === 'divider-changer-github') {
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###TITLE###/g, block.config.title));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###BUTTONTEXT###/g, block.config['button-text']));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###OLDVIEW###/g, block.config['old-view']));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###NEWVIEW###/g, block.config['new-view']));
      if (block.type === 'divider-changer-github') {
        var githubSlug = agreementId.split('GH-')[1];
        newPanels = JSON.parse(JSON.stringify(newPanels).replace(/%%%GITHUB_SLUG%%%/g, githubSlug.split('_')[0] + '/' + githubSlug.split('_')[1]));
      }
    } else if (block.type === 'divider-github' || block.type === 'divider-github-states') {
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###TITLE###/g, block.config.title));
      var githubSlug = agreementId.split('GH-')[1];
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/%%%GITHUB_SLUG%%%/g, githubSlug.split('_')[0] + '/' + githubSlug.split('_')[1]));
    } else if (block.type.includes('notZero')) {
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###METRIC.NOTZERO###/g, block.config['not-zero-metric']));
    }

    const timeGraphTitle = block.config && block.config['time-graph-title'] ? block.config['time-graph-title'] : block.guarantee;
    newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###TIME_GRAPH.TITLE###/g, timeGraphTitle));

    if (block.config && block.config['scope-class']) {
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###AGREEMENT.SCOPE.CLASS###/g, block.config['scope-class']));
    }

    var guarantee = agreement.terms.guarantees.find(gua => {
      return gua.id === block.guarantee;
    });

    if (guarantee) {
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###GUARANTEE.DESCRIPTION###/g, guarantee.description));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/"###GUARANTEE.THRESHOLD###"/g, guarantee.of[0].objective.split(' ')[guarantee.of[0].objective.split(' ').length - 1]));
    }

    if (block.type === 'time-graph2-member' || block.type === 'time-graph2-member-notZero' || block.type === 'time-graph2-member-groupby' || block.type === 'time-graph-count' || block.type === 'time-graph-count-groupby' || block.type === 'gauge-period-time-correlation-notZero' || block.type === 'gauge-period-time-correlation-notZero-member') {
      const regex = /(\([^)]+\)|[a-zA-Z_]+[\w\.\[\]]*(?:\s*\/\s*[a-zA-Z_]+[\w\.\[\]]*)?(?:\s*\*\s*\d+)?|\d+)\s*([<>=]=?|>)\s*(\d+)/;
      const match = guarantee.of[0].objective.match(regex); // Match the objective against the regular expression
      if (!match) throw new Error('Invalid objective format.'); // Check if the objective is in the expected format
      const variable = match[1]; // Extract the variable name from the match
      const operator = match[2]; // Extract the operator from the match
      const value = Number(match[3]); // Extract the value from the match and convert it to a number
      if (isNaN(value)) throw new Error('Invalid threshold value.'); // Check if the threshold value is valid

      let okThresholdSign = '';
      let criticalThresholdSign = null;
      let okThresholdSignLine = '';
      let criticalThresholdSignLine = null;

      if (operator === '>') {
        okThresholdSign = 'gt';
        criticalThresholdSign = 'lt';
        okThresholdSignLine = false;
        criticalThresholdSignLine = true;
      } else if (operator === '>=') {
        okThresholdSign = 'gt';
        criticalThresholdSign = 'lt';
        okThresholdSignLine = true;
        criticalThresholdSignLine = true;
      } else if (operator === '<') {
        okThresholdSign = 'lt';
        criticalThresholdSign = 'gt';
        okThresholdSignLine = false;
        criticalThresholdSignLine = true;
      } else if (operator === '<=') {
        okThresholdSign = 'lt';
        criticalThresholdSign = 'gt';
        okThresholdSignLine = true;
        criticalThresholdSignLine = false;
      }

      if (block.type === 'time-graph2-member-groupby' || block.type === 'time-graph-count-groupby') {
        newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###TIME_GRAPH.TIME_INTERVAL###/g, block.config['time-interval']));
        if (block.type === 'time-graph2-member-groupby') {
          newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###TIME_GRAPH.AGGREGATION###/g, block.config['aggregation']));
        }
      }

      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###GUARANTEE.OK_THRESHOLD_SIGN###/g, okThresholdSign));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###GUARANTEE.OK_THRESHOLD_SIGN_LINE###/g, okThresholdSignLine));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###GUARANTEE.CRITICAL_THRESHOLD_SIGN###/g, criticalThresholdSign));
      newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###GUARANTEE.CRITICAL_THRESHOLD_SIGN_LINE###/g, criticalThresholdSignLine));

      // If the threshold is ok, the line should be green, otherwise red (true and false values do not work in Grafana)
      if (okThresholdSignLine) {
        newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###LINE_OK###/g, "line"));
      } else {
        newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###LINE_CRITICAL###/g, "line"));
      }
    }

    // Add new panels to the current dashboard
    newPanels.forEach(panel => {
      // Increment x position for next block if fill = true
      if (blocks[block.type].config.fillRow) {
        panel.gridPos.x = currentXLocation;
        currentXLocation += blocks[block.type].config.width;
        if (currentXLocation >= 20) { currentXLocation = 0; }
      } else {
        currentXLocation = 0;
      }

      panel.gridPos.y = currentYLocation;
      panel.id = currentPanelId;
      currentPanelId++;
    });
    currentYLocation += blocks[block.type].config.height;

    newPanels = JSON.parse(JSON.stringify(newPanels).replace(/###GUARANTEE.NAME###/g, block.guarantee));

    modifiedDashboard.panels = modifiedDashboard.panels.concat(newPanels);
    var modifiedDashboardString = JSON.stringify(modifiedDashboard);
    modifiedDashboardString = modifiedDashboardString.replace(/###AGREEMENT.ID###/g, agreement.id);

    modifiedDashboard = JSON.parse(modifiedDashboardString);
  });

  // Dashboard JSON is received here, data (like thresholds) must be replaced with agreement data.
  return modifiedDashboard;
};
