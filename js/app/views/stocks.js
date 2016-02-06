define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/ticker.html'
], function($, _, Backbone, TickerTemplate) {

var StocksView = Backbone.View.extend({
  initialize: function() {
    var self = this;
    var req = $.get('/stocks', {stocks: ['.INX',
                                         '.DJI',
                                         '.ICIX',
                                         'JNJ',
                                         'FDN',
                                         'PJP']})

    req.done(function(d) {
      var d = JSON.parse(d.body.replace(/\//g, ''));
      var temp = _.template(TickerTemplate, {variable: 'data'})({'d': d});
      
      self.$el.append(temp);
      self.buildTicker();
    });
  },
  buildTicker: function() {
    this.$ticker = this.$el.find('.slider');
    this.$overflow = this.$ticker.find('ul');
    var $clones = this.$ticker.find('li').clone();

    // get max width
    this.w = this.$ticker.width();

    // set max width on slider
    this.$ticker.css('max-width', this.w);
    // and overflow
    this.$overflow.css('width', this.w*2 + 21);

    this.$overflow.append($clones);

    this.initSlider();
  },
  initSlider: function() {
    clearInterval(this.int);
    var self = this;
    var i = 0;

    this.int = setInterval(function() {
      if ( i < -self.w ) { self.initSlider() }
      self.$overflow.css('left', i--);
    }, 20);
  }
});

return StocksView;

});