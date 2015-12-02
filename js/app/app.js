define([
  'jquery',
  'views/news',
  'views/clock',
  'views/subway',
  'views/weather',
], function($, NewsView, ClockView, SubwayView, WeatherView) {

"use strict";

$(document).ready(function() {

	// new NewsView({ el: $('.news') });
	new ClockView({ el: $('.clock') });
	new SubwayView({ el: $('.subway') });
	new WeatherView({ el: $('.weather') });

	$(document).ajaxStop(function() {

		$('body').addClass('active');

	});

});

});
