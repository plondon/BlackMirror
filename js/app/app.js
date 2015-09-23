define([
  'jquery',
], function($) {

"use strict";

function addZero(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

function updateTime() {
	var $clock = $('.clock');

	var time = new Date();
	var hour = time.getHours();
	var minute = addZero(time.getMinutes());
	var seconds = addZero(time.getSeconds());
	var timeString = hour + ':' + minute + ':' + seconds;

	$clock.html(timeString);
}

$(document).ready(function() {
	updateTime();
	
	setInterval(function() {
		updateTime();
	}, 1000);

});

});