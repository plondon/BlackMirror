require.config({
	baseUrl: "/js/app",
	paths: {
		"jquery": "../lib/jquery.min"
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	waitSeconds: 0
});

require([
	"jquery"
], function() {

	require(['app'], function() {});

});