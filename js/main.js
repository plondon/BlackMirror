require.config({
	baseUrl: "/js/app",
	paths: {
		"jquery": "../lib/jquery.min",
		"underscore": "../lib/underscore",
		"backbone": "../lib/backbone",
		"text": "../lib/text"
	},
	shim: {
		jquery: {
		  exports: "$"
		},
		underscore: {
		  deps: ["jquery"],
		  exports: "_"
		},
		backbone: {
		  deps: ["jquery", "underscore"],
		  exports: "Backbone"
		}
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	waitSeconds: 0
});

require([
	"jquery",
	"underscore",
	"backbone",
	"text"
], function($, _, Backbone) {

	require(['app'], function() {});

});