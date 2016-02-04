define([
  'jquery', 
  'underscore', 
  'backbone'
], function($, _, Backbone) {

var StocksView = Backbone.View.extend({
  initialize: function() {
    var self = this;
    var req = $.get('/stocks', {stocks: ['AAPL', 'MSFT']})

    req.done(function(d) {
      var d = JSON.parse(d.body.replace(/\//g, ''));
    });
  }
});

return StocksView;

});