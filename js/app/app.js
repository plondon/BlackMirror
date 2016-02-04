define([
  'jquery',
  'views/news',
  'views/clock',
  'views/subway',
  'views/stocks',
  'views/weather',
], function($, NewsView, ClockView, SubwayView, StocksView, WeatherView) {

"use strict";

$(document).ready(function() {

	// new NewsView({ el: $('.news') });
	new ClockView({ el: $('.clock') });
	new SubwayView({ el: $('.subway') });
	new WeatherView({ el: $('.weather') });
  new StocksView({ el: $('.stocks') });

	$(document).ajaxStop(function() {

		$('body').addClass('active');

	});

});

});
