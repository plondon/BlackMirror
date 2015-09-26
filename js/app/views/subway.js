define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

"use strict";

var SubwayView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		var req = $.get('/subway');

		req.done(function(d) { self.render(d); });

		/* Update every minute */
		setInterval(function() { 
			req.done(function(d) { self.render(d); });
		}, 1000*60);
	},
	render: function(d) {
		d = JSON.parse(d.body);

		var departure = d.routes[0].legs[0];

		var subwayString = this.formatString(departure);
		var $subwayIcon = this.getSubwayIcon(departure);

		this.$el.html(subwayString);
		this.$el.prepend($subwayIcon);
	},
	formatString: function(departure) {
		var time;
		departure = departure.departure_time;
	
		var nextTrain = new Date(departure.value*1000).getMinutes();
		var currentTime = new Date().getMinutes();
		var minutesAway = 60 % (nextTrain - currentTime);

		if ( minutesAway === 1 ) {
			time = 'minute';
		} else {
			time = 'minutes';
		}

		var s = 'Train is ' + minutesAway + ' ' + time + ' away';
		return s;
	},
	getSubwayIcon: function(departure) {
		var src = departure.steps[0].transit_details.line.icon;

		return $('<img>').attr('src', src);
	} 
});

return SubwayView;

});