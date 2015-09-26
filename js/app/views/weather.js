define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

"use strict";

var WeatherView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		var req = $.get('/weather');

		req.done(function(d) { self.render(d); });

		/* Update every 5 minutes */
		setInterval(function() { 
			var req = $.get('/weather');
			req.done(function(d) { self.render(d); });
		}, 1000*60*5);
	},
	render: function(d) {
		d = JSON.parse(d.body);
		var icon = d.currently.icon;
		var temp = this.formatTemp(d.currently.temperature);

		this.$el.html(temp + '&deg F').addClass(icon);
	},
	formatTemp: function(i) {
		return i.toString().split('.')[0];
	}
});

return WeatherView;

});