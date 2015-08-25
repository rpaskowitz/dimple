    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
    // Source: /src/methods/_helpers.js
    dimple._helpers = {
        _cache: {
            cx: [],
            cy: [],
            r: [],
            xGap: [],
            xClusterGap: [],
            yGap: [],
            yClusterGap: [],
            x: [],
            y: [],
            width: [],
            height: [],
            opacity: [],
            fill: [],
            stroke: []
        },
        buildCache: function(d, chart, series) {
            fastdom.defer(1, function() {
                dimple._helpers.cacheFill(d, chart, series);
                dimple._helpers.cacheStroke(d, chart, series);
                dimple._helpers.cacheOpacity(d, chart, series);
                dimple._helpers.cacheR(d, chart, series);
                dimple._helpers.cacheXGap(d, chart, series);
                dimple._helpers.cacheYGap(d, chart, series);
            });
            fastdom.defer(2, function() {
                dimple._helpers.cacheCx(d, chart, series);
                dimple._helpers.cacheCy(d, chart, series);
                dimple._helpers.cacheXClusterGap(d, chart, series);
                dimple._helpers.cacheYClusterGap(d, chart, series);
            });
            fastdom.defer(3, function() {
                dimple._helpers.cacheWidth(d, chart, series);
                dimple._helpers.cacheHeight(d, chart, series);
            });
            fastdom.defer(4, function() {
                dimple._helpers.cacheX(d, chart, series);
                dimple._helpers.cacheY(d, chart, series);
            });
        },
        // Calculate the centre x position
        cacheCx: function (d, chart, series) {
            var returnCx = 0;
            if (series.x.measure !== null && series.x.measure !== undefined) {
                returnCx = series.x._scale(d.cx);
            } else if (series.x._hasCategories() && series.x.categoryFields.length >= 2) {
                returnCx = series.x._scale(d.cx) + dimple._helpers.xGap(chart, series) + ((d.xOffset + 0.5) * (((chart._widthPixels() / series.x._max) - 2 * dimple._helpers.xGap(chart, series)) * d.width));
            } else {
                returnCx = series.x._scale(d.cx) + ((chart._widthPixels() / series.x._max) / 2);
            }
            dimple._helpers._cache.cx[d.key] = returnCx;
        },

        cx: function(d) {
            return dimple._helpers._cache.cx[d.key];
        },

        // Calculate the centre y position
        cacheCy: function (d, chart, series) {
            var returnCy = 0;
            if (series.y.measure !== null && series.y.measure !== undefined) {
                returnCy = series.y._scale(d.cy);
            } else if (series.y.categoryFields !== null && series.y.categoryFields !== undefined && series.y.categoryFields.length >= 2) {
                returnCy = (series.y._scale(d.cy) - (chart._heightPixels() / series.y._max)) +  dimple._helpers.yGap(chart, series) + ((d.yOffset + 0.5) * (((chart._heightPixels() / series.y._max) - 2 * dimple._helpers.yGap(chart, series)) * d.height));
            } else {
                returnCy = series.y._scale(d.cy) - ((chart._heightPixels() / series.y._max) / 2);
            }
            dimple._helpers._cache.cy[d.key] = returnCy;
        },

        cy: function(d) {
            return dimple._helpers._cache.cy[d.key];
        },

        // Calculate the radius
        cacheR: function (d, chart, series) {
            var returnR = 0,
                scaleFactor = 1;
            if (series.z === null || series.z === undefined) {
                returnR = (!series.radius || series.radius === "auto" ? 5 : series.radius);
            } else {
                if (series.radius && series.radius !== "auto" && series.radius > 1) {
                    scaleFactor = series.radius / series.z._scale(series.z._max);
                }
                if (series.z._hasMeasure()) {
                    returnR = series.z._scale(d.r) * scaleFactor;
                } else {
                    returnR = series.z._scale(chart._heightPixels() / 100) * scaleFactor;
                }
            }
            dimple._helpers._cache.r[d.key] = returnR;
        },

        r: function(d) {
            return dimple._helpers._cache.r[d.key];
        },

        // Calculate the x gap for bar type charts
        cacheXGap: function (chart, series) {
            var returnXGap = 0;
            if ((series.x.measure === null || series.x.measure === undefined) && series.barGap > 0) {
                returnXGap = ((chart._widthPixels() / series.x._max) * (series.barGap > 0.99 ? 0.99 : series.barGap)) / 2;
            }
            dimple._helpers._cache.xGap = returnXGap;
        },

        xGap: function() {
            return dimple._helpers._cache.xGap;
        },

        // Calculate the x gap for clusters within bar type charts
        cacheXClusterGap: function (d, chart, series) {
            var returnXClusterGap = 0;
            if (series.x.categoryFields !== null && series.x.categoryFields !== undefined && series.x.categoryFields.length >= 2 && series.clusterBarGap > 0 && !series.x._hasMeasure()) {
                returnXClusterGap = (d.width * ((chart._widthPixels() / series.x._max) - (dimple._helpers.xGap(chart, series) * 2)) * (series.clusterBarGap > 0.99 ? 0.99 : series.clusterBarGap)) / 2;
            }
            dimple._helpers._cache.xClusterGap[d.key] = returnXClusterGap;
        },

        xClusterGap: function(d) {
            return dimple._helpers._cache.xClusterGap[d.key];
        },

        // Calculate the y gap for bar type charts
        cacheYGap: function (chart, series) {
            var returnYGap = 0;
            if ((series.y.measure === null || series.y.measure === undefined) && series.barGap > 0) {
                returnYGap = ((chart._heightPixels() / series.y._max) * (series.barGap > 0.99 ? 0.99 : series.barGap)) / 2;
            }
            dimple._helpers._cache.yGap = returnYGap;
        },

        yGap: function() {
            return dimple._helpers._cache.yGap;
        },

        // Calculate the y gap for clusters within bar type charts
        cacheYClusterGap: function (d, chart, series) {
            var returnYClusterGap = 0;
            if (series.y.categoryFields !== null && series.y.categoryFields !== undefined && series.y.categoryFields.length >= 2 && series.clusterBarGap > 0 && !series.y._hasMeasure()) {
                returnYClusterGap = (d.height * ((chart._heightPixels() / series.y._max) - (dimple._helpers.yGap(chart, series) * 2)) * (series.clusterBarGap > 0.99 ? 0.99 : series.clusterBarGap)) / 2;
            }
            dimple._helpers._cache.yClusterGap[d.key] = returnYClusterGap;
        },

        yClusterGap: function(d) {
            return dimple._helpers._cache.yClusterGap[d.key];
        },

        // Calculate the top left x position for bar type charts
        cacheX: function (d, chart, series) {
            var returnX = 0;
            if (series.x._hasTimeField()) {
                returnX = series.x._scale(d.x) - (dimple._helpers.width(d, chart, series) / 2);
            } else if (series.x.measure !== null && series.x.measure !== undefined) {
                returnX = series.x._scale(d.x);
            } else {
                returnX = series.x._scale(d.x) + dimple._helpers.xGap(chart, series) + (d.xOffset * (dimple._helpers.width(d, chart, series) + 2 * dimple._helpers.xClusterGap(d, chart, series))) + dimple._helpers.xClusterGap(d, chart, series);
            }
            dimple._helpers._cache.x[d.key] = returnX;
        },

        x: function(d) {
            return dimple._helpers._cache.x[d.key];
        },

        // Calculate the top left y position for bar type charts
        cacheY: function (d, chart, series) {
            var returnY = 0;
            if (series.y._hasTimeField()) {
                returnY = series.y._scale(d.y) - (dimple._helpers.height(d, chart, series) / 2);
            } else if (series.y.measure !== null && series.y.measure !== undefined) {
                returnY = series.y._scale(d.y);
            } else {
                returnY = (series.y._scale(d.y) - (chart._heightPixels() / series.y._max)) + dimple._helpers.yGap(chart, series) + (d.yOffset * (dimple._helpers.height(d, chart, series) + 2 * dimple._helpers.yClusterGap(d, chart, series))) + dimple._helpers.yClusterGap(d, chart, series);
            }
            dimple._helpers._cache.y[d.key] = returnY;
        },

        y: function(d) {
            return dimple._helpers._cache.y[d.key];
        },

        // Calculate the width for bar type charts
        cacheWidth: function (d, chart, series) {
            var returnWidth = 0;
            if (series.x.measure !== null && series.x.measure !== undefined) {
                returnWidth = Math.abs(series.x._scale((d.x < 0 ? d.x - d.width : d.x + d.width)) - series.x._scale(d.x));
            } else if (series.x._hasTimeField()) {
                returnWidth = series.x.floatingBarWidth;
            } else {
                returnWidth = d.width * ((chart._widthPixels() / series.x._max) - (dimple._helpers.xGap(chart, series) * 2)) - (dimple._helpers.xClusterGap(d, chart, series) * 2);
            }
            dimple._helpers._cache.width[d.key] = returnWidth;
        },

        width: function(d) {
            return dimple._helpers._cache.width[d.key];
        },

        // Calculate the height for bar type charts
        cacheHeight: function (d, chart, series) {
            var returnHeight = 0;
            if (series.y._hasTimeField()) {
                returnHeight = series.y.floatingBarWidth;
            } else if (series.y.measure !== null && series.y.measure !== undefined) {
                returnHeight = Math.abs(series.y._scale(d.y) - series.y._scale((d.y <= 0 ? d.y + d.height : d.y - d.height)));
            } else {
                returnHeight = d.height * ((chart._heightPixels() / series.y._max) - (dimple._helpers.yGap(chart, series) * 2)) - (dimple._helpers.yClusterGap(d, chart, series) * 2);
            }
            dimple._helpers._cache.height[d.key] = returnHeight;
        },

        height: function (d) {
            return dimple._helpers._cache.height[d.key];
        },

        // Calculate the opacity for series
        cacheOpacity: function (d, chart, series) {
            var returnOpacity = 0;
            if (series.c !== null && series.c !== undefined) {
                returnOpacity = d.opacity;
            } else {
                returnOpacity = chart.getColor(d.aggField.slice(-1)[0]).opacity;
            }
            dimple._helpers._cache.opacity[d.key] = returnOpacity;
        },

        opacity: function(d) {
            return dimple._helpers._cache.opacity[d.key];
        },

        // Calculate the fill coloring for series
        cacheFill: function (d, chart, series) {
            var returnFill = 0;
            if (series.c !== null && series.c !== undefined) {
                returnFill = d.fill;
            } else {
                returnFill = chart.getColor(d.aggField.slice(-1)[0]).fill;
            }
            dimple._helpers._cache.fill[d.key] = returnFill;
        },

        fill: function(d) {
            return dimple._helpers._cache.fill[d.key];
        },

        // Calculate the stroke coloring for series
        cacheStroke: function (d, chart, series) {
            var stroke = 0;
            if (series.c !== null && series.c !== undefined) {
                stroke = d.stroke;
            } else {
                stroke = chart.getColor(d.aggField.slice(-1)[0]).stroke;
            }
            dimple._helpers._cache.stroke[d.key] = stroke;
        },

        stroke: function(d) {
            return dimple._helpers._cache.stroke[d.key];
        },

        // Calculate the class for the series
        css: function (d, chart) {
            return chart.getClass(d.aggField.slice(-1)[0]);
        }


    };

