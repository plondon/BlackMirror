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
		var firstStep = this.getFirstStep(departure);

		var $subwayIcon = this.getSubwayIcon(firstStep);
		var subwayString = this.getSubwayString(firstStep);

		this.$el.html(subwayString);
		this.$el.prepend($subwayIcon);
	},
	getFirstStep: function(departure) {
		var steps = departure.steps;
		var l = steps.length;

		for ( var i = 0; i < l; i++ ) {
			if ( steps[i].travel_mode === 'TRANSIT' ) {
				return steps[i];
			}
		}
	},
	getSubwayString: function(step) {
		var time;

		var departure_time = step.transit_details.departure_time;
	
		var nextTrain = new Date(departure_time.value*1000).getMinutes();
		var currentTime = new Date().getMinutes();
		var minutesAway = nextTrain - currentTime;

		minutesAway = minutesAway <= -1 ? 60 % minutesAway : minutesAway;

		if ( minutesAway === 1 ) {
			time = 'minute';
		} else {
			time = 'minutes';
		}

		var s = 'Train is ' + minutesAway + ' ' + time + ' away';
		return s;
	},
	getSubwayIcon: function(departure) {
		var src = departure.transit_details.line.icon;

		return $('<img>').attr('src', src);
	} 
});

return SubwayView;

});