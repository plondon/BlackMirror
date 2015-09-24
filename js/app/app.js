define([
  'jquery',
  'views/clock'
], function($, ClockView) {

"use strict";

$(document).ready(function() {

	new ClockView({ el: $('.clock') });

});

});