define([
  'jquery',
  'views/clock',
  'views/weather',
  'views/subway'
], function($, ClockView, WeatherView, SubwayView) {

"use strict";

$(document).ready(function() {

	new ClockView({ el: $('.clock') });
	new WeatherView({ el: $('.weather') });
	new SubwayView({ el: $('.subway') });

	$(document).ajaxStop(function() {

		$('body').addClass('active');

	});

});

});