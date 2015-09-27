define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

"use strict";

var NewsView = Backbone.View.extend({
	initialize: function() {
		this.idx = 0;
		this.max = 8;
		var self = this;
		var req = $.get('/news');

		req.done(function(d) { self.render(d); });

		/* Update every hour */
		setInterval(function() { 
			var req = $.get('/news');
			req.done(function(d) { self.render(d); });
		}, 1000*60*60);
	},
	render: function(d) {
		var $ul = this.$el.find('> ul');
		d = JSON.parse(d.body);

		d.responseData.results.forEach(function(article) {
			var $li = $('<li>');
			$li.html(article.title);

			$ul.append($li);
		});

		this.cycle();
		if (this.interval) { clearInterval(interval); }
		this.interval = setInterval( this.cycle.bind(this), 4000 );
	},
	cycle: function() {
		var idx = this.idx;
		var $list = this.$el.find('> ul > li');

		$list.removeClass('active');
		$($list[idx]).addClass('active');

		this.idx = idx+1;
		if ( this.idx >= 8 ) {
			this.idx = 0;
		}
	}
});

return NewsView;

});