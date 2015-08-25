// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/begin.js

// Wrap all application code in a self-executing function which handles optional AMD/CommonJS publishing
(function (context, dimple) {
    "use strict";

    if (typeof exports === "object") {
        // CommonJS
        module.exports = dimple(require('d3'), require('fastdom'));
    } else {
        if (typeof define === "function" && define.amd) {
            // RequireJS | AMD
            define(["d3", "fastdom"], function (d3, fastdom) {
                // publish dimple to the global namespace for backwards compatibility
                // and define it as an AMD module
                context.dimple = dimple(d3, fastdom);
                return context.dimple;
            });
        } else {
            // No AMD, expect d3 to exist in the current context and publish
            // dimple to the global namespace
            if (!context.d3 || !context.fastdom) {
                if (console && console.warn) {
                    console.warn("dimple requires d3 and fastdom to run.  Are you missing a reference to the d3 or fastdom library?");
                } else {
                    throw "dimple requires d3 and fastdomr to run.  Are you missing a reference to the d3 or fastdom library?";
                }
            } else {
                context.dimple = dimple(context.d3, context.fastdom);
            }
        }
    }

}(this, function (d3, fastdom) {
    "use strict";

    // Create the stub object
    var dimple = {
        version: "2.1.6",
        plot: {},
        aggregateMethod: {}
    };
