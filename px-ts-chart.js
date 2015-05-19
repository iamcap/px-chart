Polymer({

  is: 'px-ts-chart',

  /**
   * Properties block, expose attribute values to the DOM via 'reflect'
   *
   * @property properties
   * @type Object
   */
  properties: {

    /**
     * Start time of zoom-ed area shown in the navigator
     *
     * @type {String}
     * @default undefined
     */
    rangeStart: {
      type: String,
      observer: 'rangeObserver'
    },

    /**
     * End time of zoom-ed area shown in the navigator
     *
     * @type {String}
     * @default undefined
     */
    rangeEnd: {
      type: String,
      observer: 'rangeObserver'
    },

    /**
     * Whether to show the zoom-able / scroll-able area at the bottom of the chart
     *
     * @type {Boolean}
     * @default true
     */
    navigatorEnabled:{
      type: Boolean,
      value: true
    },

    /**
     * See http://api.highcharts.com/highcharts#chart.backgroundColor
     *
     * @default rgb(255,255,255)
     */
    backgroundColor: {
      type: String,
      value: 'rgb(255,255,255)'
    },

    /**
     * See http://api.highcharts.com/highcharts#chart.events
     *
     * @default redraw function()
     */
    events: {
      type: Object,
      value: {
        redraw: function() {
          var extremes = this.xAxis[0].getExtremes();
          var tsChart = Polymer.dom(this.renderTo).parentNode.parentNode;

          tsChart.debounce(
            'set-extremes', function() {
              this.rangeStart = extremes.min;
              this.rangeEnd = extremes.max;
            }, 250);
        }
      }
    },

    /**
     * See http://api.highcharts.com/highcharts#plotOptions.series.events
     *
     * @default show & hide series function()
     */
    seriesEvents: {
      type: Object,
      value: {
        show: function() {
          var tsChart = Polymer.dom(this.chart.renderTo).parentNode.parentNode;
          // tsChart.chartState.seriesState = this.chart.series;
          tsChart.set('chartState.seriesState', this.chart.series)
        },
        hide: function() {
          var tsChart = Polymer.dom(this.chart.renderTo).parentNode.parentNode;
          // tsChart.chartState.seriesState = this.chart.series;
          tsChart.set('chartState.seriesState', this.chart.series)
        }
      }
    },

    /**
     * See http://api.highcharts.com/highcharts#chart.height
     *
     * @default 400
     */
    height: {
      type: Number,
      value: 400
    },

    /**
     * See http://api.highcharts.com/highcharts#chart.margin
     *
     * @default [90,30,30,30]
     */
    margin: {
      type: Array,
      value: [96,40,30,40]
    },

    /**
     * See http://api.highcharts.com/highcharts#chart.plotBorderWidth
     *
     * @default 1
     */
    plotBorderWidth: {
      type: Number,
      value: 1
    },

    /**
     * See http://api.highcharts.com/highcharts#chart.plotBorderWidth
     *
     * @default [0,0,25,0]
     */
    spacing: {
      type: Array,
      value: [0,0,25,0]
    },

    /**
     * See http://api.highcharts.com/highcharts#chart.zoomType
     *
     * @default "x"
     */
    zoomType: {
      type: String,
      value: 'x'
    },

    /**
     * Holds chart state for binding between charts & serialising chart settings.
     *
     * @default {}
     */
    chartState: {
      type: Object,
      value: function(){
        return {};
      },
      notify: true//,
      // observer: 'chartStateUpdated'
    },

    /**
     * Mapping of color name to rgb value for use in datavis.
     *
     * @type {Object}
     * @default Same is datavis colors in px-colors-design
     */
    dataVisColors: {
      type: Object,
      value: {
        "dv-basic-gray": "rgb(77, 77, 77)",
        "dv-basic-blue": "rgb(93, 165, 218)",
        "dv-basic-orange": "rgb(250, 164, 58)",
        "dv-basic-green": "rgb(96, 189, 104)",
        "dv-basic-pink": "rgb(241, 124, 176)",
        "dv-basic-brown": "rgb(178, 145, 47)",
        "dv-basic-purple": "rgb(178, 118, 178)",
        "dv-basic-yellow": "rgb(222, 207, 63)",
        "dv-basic-red": "rgb(241, 88, 84)",

        "dv-light-gray": "rgb(140, 140, 140)",
        "dv-light-blue": "rgb(136, 189, 230)",
        "dv-light-orange": "rgb(251, 178, 88)",
        "dv-light-green": "rgb(144, 205, 151)",
        "dv-light-pink": "rgb(246, 170, 201)",
        "dv-light-brown": "rgb(191, 165, 84)",
        "dv-light-purple": "rgb(188, 153, 199)",
        "dv-light-yellow": "rgb(237, 221, 70)",
        "dv-light-red": "rgb(240, 126, 110)",

        "dv-dark-gray": "rgb(0, 0, 0)",
        "dv-dark-blue": "rgb(38, 93, 171)",
        "dv-dark-orange": "rgb(223, 92, 36)",
        "dv-dark-green": "rgb(5, 151, 72)",
        "dv-dark-pink": "rgb(229, 18, 111)",
        "dv-dark-brown": "rgb(157, 114, 42)",
        "dv-dark-purple": "rgb(123, 58, 150)",
        "dv-dark-yellow": "rgb(199, 180, 46)",
        "dv-dark-red": "rgb(203, 32, 39)"
      }
    },

    /**
     * Mapping of color names in the order they should be applied to chart series.
     *
     * @type {Array}
     */
    seriesColorOrder: {
      type: Array,
      value: [
        "dv-basic-gray",
        "dv-basic-blue",
        "dv-basic-orange",
        "dv-basic-green",
        "dv-basic-pink",
        "dv-basic-brown",
        "dv-basic-purple",
        "dv-basic-yellow",
        "dv-basic-red",

        "dv-light-gray",
        "dv-light-blue",
        "dv-light-orange",
        "dv-light-green",
        "dv-light-pink",
        "dv-light-brown",
        "dv-light-purple",
        "dv-light-yellow",
        "dv-light-red",

        "dv-dark-gray",
        "dv-dark-blue",
        "dv-dark-orange",
        "dv-dark-green",
        "dv-dark-pink",
        "dv-dark-brown",
        "dv-dark-purple",
        "dv-dark-yellow",
        "dv-dark-red"
      ]
    }
  },

  observers: [
    'chartStateUpdated(chartState.*)'
  ],

  defaultYAxisConfig: null,

  defaultSeriesConfig: null,

  chartStateUpdated: function(evt){
    var chartExtremesHaveChanged = function (self){
      var currentChartExtremes = self.chart.xAxis[0].getExtremes();
      return (currentChartExtremes.max !== evt.value.chartZoom.max || currentChartExtremes.min !== evt.value.chartZoom.min);
    };

    var chartAndEventAreValid= function(self){
      return(self.chart && evt.value.srcElement);
    };

     if (chartAndEventAreValid(this)){
       if (chartExtremesHaveChanged(this)) {
         if (evt.value.srcElement !== this){
           this.chart.xAxis[0].setExtremes(evt.value.chartZoom.min, evt.value.chartZoom.max, true);
         }
       }
     }
   },

  /**
   * Lifecycle callback to create the Highchart 'chart' object and consume the config / series elements
   */
  ready: function() {
    var chartConfig = this.buildConfig();
    var _this = this;

    this.chart = new Highcharts.StockChart(chartConfig);

    this.chart.yAxis.forEach(function(axis) {
      axis.remove();//since we created the chart without any y-axes, Highcharts created one for us...remove it as our axis config comes next.
    });

    var axisEls = Polymer.dom(this).querySelectorAll("px-chart-yaxis");
    var axisElsProcessed = 0;
    if (!axisEls || axisEls.length === 0) {
      this.addYAxis(/*axisConfig*/null, /*noRedraw*/true);
      this.addInitialSeries();
    }
    else {
      axisEls.forEach(function(axisEl) {
        axisEl.addEventListener("y-axis-ready", function(evt) {
          var axisConfig = evt.target.buildConfig(_this.dataVisColors["dv-light-gray"]);
          _this.addYAxis(axisConfig, /*noRedraw*/true);
          axisElsProcessed++;
          if (axisElsProcessed === axisEls.length) {
            _this.addInitialSeries();
          }
        });
      });
    }
  },

  listeners: {
    'after-set-extremes': 'firechartStateUpdated'
  },

  firechartStateUpdated: function(evt){
    var extremes = this.chart.xAxis[0].getExtremes();
    var tsChart = Polymer.dom(this).node;
      tsChart.debounce(
        'set-chart-state', function() {
          this.set('chartState', {chartZoom: extremes, srcElement: this});
      }, 250);
  },

  /**
   * Internal callback for Highcharts config ready
   */
  addInitialSeries: function() {
    //find series elements in light dom ("Polymer.dom(this)" vs. "Polymer.dom(this.root)", which would be shadow dom)
    var seriesEls = Polymer.dom(this).querySelectorAll("px-chart-series");
    var _this = this;
    seriesEls.forEach(function (seriesEl) {
      seriesEl.addEventListener("series-ready", function(evt) {
        _this.addSeries(seriesEl.buildConfig(), /*noRedraw*/true);
        seriesEl.addEventListener("data-changed", function(evt) {
          _this.updateSeries(seriesEl.id, evt.detail.value, /*noRedraw*/false);
          _this.chart.reflow();
        });
        _this.chart.reflow();
        _this.chart.redraw();
      });
    });
  },

  /**
   * Sets display string for start/end range when internal value changes
   */
  rangeObserver: function () {
    var controlsEl = Polymer.dom(this).querySelector("[data-controls]");
    if (controlsEl && controlsEl.set) {
      var mStart = moment(this.rangeStart);
      var mEnd = moment(this.rangeEnd);
      controlsEl.set("rangeStartDisplayStr", mStart.isValid() ? mStart.format('L') + " " + mStart.format("hh:ss") : null);
      controlsEl.set("rangeEndDisplayStr", mEnd.isValid() ? mEnd.format('L') + " " + mEnd.format("hh:ss") : null);
    }
  },

  addYAxis: function(axisConfig, defaultColor, noRedraw) {
    if (!axisConfig) {
      this.defaultYAxisConfig = this.defaultYAxisConfig || document.createElement("px-chart-yaxis");
      this.defaultYAxisConfig.offset = this.defaultYAxisConfig.offset + 10;
      axisConfig = this.defaultYAxisConfig.buildConfig(defaultColor || this.dataVisColors["dv-light-gray"]);
    }
    this.chart.addAxis(axisConfig, /*isX*/false, !noRedraw);
  },

  /**
   * Adds a series to the chart, adding a yAxis as needed
   *
   * @param {Object} seriesConfig
   *    @config {String} id
   *    @config {Array} data
   *    @config {Number} yAxis Optional. The axis index to which the series should be bound. Defaults to 0.
   *    @config {Number} lineWidth Optional.
   *    @config {Object} marker. Optional. Highcharts marker config
   *    @config {Object} tooltip. Optional. Highcharts tooltip config
   * @param {Boolean} noRedraw Optional. If true, does not force a chart redraw() after adding or updating the series
   */
  addSeries: function(seriesConfig, noRedraw) {
    if (seriesConfig && this.hasSeries(seriesConfig.id)) {
      this.updateSeries(seriesConfig.id, seriesConfig.data, noRedraw);
    }
    else {
      if (!seriesConfig) {
        this.defaultSeriesConfig = this.defaultSeriesConfig || document.createElement("px-chart-series");
        seriesConfig = this.defaultSeriesConfig.buildConfig();
      }
      if (!seriesConfig.id) {
        seriesConfig.id = this.chart.series.length;
      }
      if (typeof seriesConfig.yAxis === "number" && this.chart.yAxis.length <= seriesConfig.yAxis) {//if we are adding to an axis that doesn't exist, add default axis
        this.addYAxis(null, /*defaultColor*/null, /*noRedraw*/true);
        seriesConfig.yAxis = this.chart.yAxis.length;//make sure we are adding the very next axis, no matter what the dev passed.
      }
      this.chart.addSeries(seriesConfig, !noRedraw);
    }
  },

  /**
   * Updates a series on the chart, adding a default series as needed.
   *
   * @param {String} seriesId
   * @param {Array} data
   * @param {Boolean} noRedraw Optional. If true, does not force a chart redraw() after adding or updating the series
   */
  updateSeries: function(seriesId, data, noRedraw) {
    if (!this.hasSeries(seriesId)) {
      this.addSeries(/*seriesConfig*/null, /*noRedraw*/true);
    }
    this.chart.get(seriesId).setData(data, !noRedraw);
  },

  /**
   * Removes a series from the chart
   *
   * @param {String} seriesId
   */
  removeSeries: function(seriesId) {
    this.chart.get(seriesId).remove();
  },

  /**
   * Returns true if the chart has a series with the given id
   *
   * @param {String} seriesId
   * @return {Boolean}
   */
  hasSeries: function(seriesId) {
    return (this.chart.get(seriesId) != null);
  },

  /**
   * Toggles display of points on the chart
   *
   * @param {Array} seriesIds Optional. seriesIds ids of the series to update, or null for all
   */
  togglePointMarkers: function(seriesIds) {
    var _this = this;
    var seriesToUpdate = seriesIds ? seriesIds.map(function(id) {return _this.chart.get(id)}) : this.chart.series;
    seriesToUpdate.forEach(function(series) {
      var existingMarkerOpts = series.options.marker;
      series.update({marker: {enabled: (!existingMarkerOpts || !existingMarkerOpts.enabled)}}, /*redraw*/false);
    });
    this.chart.redraw();
  },

  /**
   * Returns true of rangeStart / end has changed
   *
   * @param {Number} start Range start time in milliseconds since the epoch
   * @param {Number} end Range end time in milliseconds since the epoch
   * @return {Boolean}
   */
  hasExtremeChanged: function (start, end) {
    var extremes = this.chart.xAxis[0].getExtremes();
    return extremes.min !== start || extremes.max !== end;
  },

  /**
   * Sets the range start / end given number of months back from present
   *
   * @param {Number} numMonths Number of months back from present
   */
  setRangeNumMonthsFromPresent: function (numMonths) {
    var m = moment(this.rangeEnd);
    m.subtract(numMonths, 'months');
    this.rangeStart = m.valueOf();
    this.setExtremesIfChanged(this.rangeStart, this.rangeEnd);
  },

  /**
   * Sets range to current year to date
   */
  setRangeToYTD: function () {
    var m = moment();
    this.rangeEnd = m.valueOf();
    this.rangeStart = m.startOf('year').valueOf();
    this.setExtremesIfChanged(this.rangeStart, this.rangeEnd);
  },

  /**
   * Sets chart extremes to given start and end times
   *
   * @param {Number} startTime Range start time in milliseconds since the epoch
   * @param {Number} endTime Range end time in milliseconds since the epoch
   */
  setExtremesIfChanged: function (startTime, endTime) {
    if (this.hasExtremeChanged(startTime, endTime)) {
      this.rangeStart = startTime;
      this.rangeEnd = endTime;
      this.chart.xAxis[0].setExtremes(this.rangeStart, this.rangeEnd);
    }
    else {
      // always set the visible strings back to a good value
      this.rangeObserver();
    }
  },

  /**
   * Builds up highcharts config object
   */
  buildConfig: function() {
    var self = this;

    var createSeriesColorsArray = function(colors, keysInOrder){
      return keysInOrder.map(function(key) {
        var color = colors[key];
        if (color) {
          return color;
        }
      });
    };

    return {
      colors: createSeriesColorsArray(this.dataVisColors, this.seriesColorOrder),
      annotationsOptions: {
        enabledButtons: false
      },
      chart: {
        events: this.events,
        height: this.height,
        margin: this.margin,
        plotBorderColor: this.dataVisColors["dv-light-gray"],
        plotBorderWidth: this.plotBorderWidth,
        renderTo: this.$.container,
        spacing: this.spacing,
        style: {
          fontFamily: 'inherit',
          fontSize: 'inherit'
        },
        zoomType: this.zoomType
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: true,
        verticalAlign: 'top',
        align: 'left',
        itemDistance: 150,
        floating: true,
        itemMarginBottom: 10,
        itemMarginTop: 5,
        itemStyle: {
          fontSize: 'inherit',
          fontWeight: 'normal'
        }
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      navigator: {
        adaptToUpdatedData: true,
        height: 50,
        margin: 15,
        outlineColor: this.dataVisColors["dv-light-gray"],
        maskFill: 'rgba(200,231,251,0.3)',
        series: {
          color: 'transparent',
          lineColor: this.dataVisColors["dv-dark-blue"],
          lineWidth: 2
        },
        xAxis: {
          gridLineWidth: 0,
          labels: {
            style: {
              fontSize: '0.8rem'
            },
            y: 15
          }
        }
      },
      plotOptions: {
        line: {
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          }
        },
        scatter: {
          marker: {
            enabled: true
          }
        },
        series: {
          marker: {},
          events: this.seriesEvents
        }
      },
      rangeSelector: {
        enabled: false
      },
      series: [],
      scrollbar: {
        enabled: false
      },
      title: {
        text: null
      },
      tooltip: {
        backgroundColor: "white",
        borderColor: this.dataVisColors["dv-light-gray"],
        shadow: false,
        style: {
          fontFamily: 'inherit',
          fontSize: 'inherit'
        },
        headerFormat: '<span>{point.key}</span><br/>',
        pointFormat: '<span style="color:{series.color}">{series.name}: {point.y}</span><br/>'
      },
      xAxis: {
        events: {
          afterSetExtremes: function(event) {
            self.fire('after-set-extremes', event);
          }
        },
        labels: {
          align: "left",
          style: {
            fontSize: '0.8rem'
          },
          x: 3,
          y: 12
        },
        lineColor: this.dataVisColors["dv-light-gray"],
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: true,
        title: {
          text: null
        }
      }
    };
  }
});
