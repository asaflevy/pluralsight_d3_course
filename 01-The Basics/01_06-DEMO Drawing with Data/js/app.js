$(function () {

  var draw = new d3Draw({
    'svg_width': 300,
    'svg_height': 100,
    'dataSet': [110, 20, 30,5,20,59,30]
  });


})

function d3Draw(settings) {
  this.data = settings.data || {};
  $.extend(this, d3Draw.defaults, settings);
  this.appendSvg('div.svg');
  this.draw();
}

d3Draw.defaults = {
  'svg_height': 400,
  'svg_width': 10,
  'dataSet': [],
  'padding': 2
};

d3Draw.prototype.draw = function () {
  var h = this.svg_height;
  var w = this.svg_width;
  var _self = this;
  this.svg.selectAll('rect')
    .data(this.dataSet)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
      return (i * (w/_self.dataSet.length))
    })
//    .attr('y', 0) // start from top
    .attr('y', function(d){return h-(d)}) // start from bottom
    .attr('height', function(d){return d})
    .attr('width', w / this.dataSet.length - _self.padding)

};

d3Draw.prototype.appendSvg = function (selector) {
  var h = this.svg_height;
  var w = this.svg_width;
  this.svg = d3.select(selector || 'body')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
};








