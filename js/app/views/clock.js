define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

"use strict";

var ClockView = Backbone.View.extend({
	initialize: function() {
		this.today();
		this.ticktock();
		setInterval( this.ticktock.bind(this), 1000 );
	},
	today: function() {
		var time = new Date();
		time = time.toDateString();

		this.$el.find('.date').html(time);
	},
	ticktock: function() {
		var time = new Date();
		var hour = time.getHours() % 12;
		hour = time.getHours() === 12 ? 12 : hour;
		var ampm = time.getHours() < 12 ? 'AM' : 'PM';
		var minute = this.addZero(time.getMinutes());
		var seconds = this.addZero(time.getSeconds());

		var timeString = hour + ':' + minute + ':' + seconds;
		var $ampm = $('<span>').html(ampm);

		this.$el.find('.time').html(timeString)
			.append($ampm);
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