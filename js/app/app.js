define([
  'jquery',
  'views/clock',
  'views/weather'
], function($, ClockView, WeatherView) {

"use strict";

$(document).ready(function() {

	new ClockView({ el: $('.clock') });
	new WeatherView({ el: $('.weather') });

});

});