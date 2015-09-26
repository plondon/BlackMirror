define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

"use strict";

var ClockView = Backbone.View.extend({
	initialize: function() {
		this.ticktock();
		setInterval( this.ticktock.bind(this), 1000 );
	},
	ticktock: function() {
		var time = new Date();
		var hour = time.getHours() % 12;
		var minute = this.addZero(time.getMinutes());
		var seconds = this.addZero(time.getSeconds());
		var timeString = hour + ':' + minute + ':' + seconds;

		this.$el.html(timeString);
	},
	addZero: function(i) {
		if (i < 10) {
		    i = "0" + i;
		}
		return i;
	}
});

return ClockView;

});