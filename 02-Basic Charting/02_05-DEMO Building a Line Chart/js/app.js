$(function () {

  var draw = new d3Draw({
    'svg_width': window.innerWidth,
    'svg_height': 200,
    'dataSet': [
      {'month': 10, 'sales': 100},
      {'month': 20, 'sales': 60},
      {'month': 30, 'sales': 1},
      {'month': 40, 'sales': 100},
      {'month': 50, 'sales': 3},
      {'month': 55, 'sales': 2},
      {'month': 60, 'sales': 10},
      {'month': 70, 'sales': 20},
      {'month': 80, 'sales': 101},
      {'month': 90, 'sales': 1},
      {'month': 100, 'sales': 30},
      {'month': 110, 'sales': 10},
      {'month': 120, 'sales': 20},
      {'month': 130, 'sales': 90}
    ]
  });


});

function d3Draw(settings) {
  this.data = settings.data || {};
  $.extend(this, d3Draw.defaults, settings);
  this.appendSvg('div.svg');
  this.build_line_fun();
  this.draw();
  this.drawLabel();
  this.draw_circle();
}

d3Draw.defaults = {
  'svg_height': 400,
  'svg_width': 200,
  'dataSet': [],
  'padding': 2
};

d3Draw.prototype.draw = function () {
  var h = this.svg_height;
  var w = this.svg_width;
  var _self = this;
  this.svg.append('path')
    .attr({
      d: this.lineFun(_self.dataSet),
      'stroke': 'red',
      'stroke-width': 4,
      'fill':'none'
    })
};

d3Draw.prototype.build_line_fun = function () {
  var h = this.svg_height;
  var w = this.svg_width;
this.lineFun = d3.svg.line()
  .x(function(d){return d.month*4})
  .y(function(d){return h-d.sales})
  .interpolate('linear')
};

d3Draw.prototype.draw_circle = function () {
  var h = this.svg_height;
  var w = this.svg_width;
  var _self = this;
  this.svg.selectAll('circle')
    .data(this.dataSet)
    .enter()
    .append('circle')
    .attr({
      cx : function(d){return d.month*4},
      cy :function(d){return h-d.sales},
      r:3,
      'stroke': 'red',
      fill:"#FAFAFA"
    })
};

d3Draw.prototype.drawLabel = function(){
  var h = this.svg_height;
  var w = this.svg_width;
  var _self = this;
  this.svg.selectAll('text')
    .data(this.dataSet)
    .enter()
    .append('text')
    .text(function(d){return d.sales})
    .attr({
      x: function(d){return d.month*4},
      y :function(d){return h-d.sales},
      "font-size": "12px",
      "font-family": "sans-serif",
      "fill": "#666666",
      "text-anchor": "start",
      "dy": ".35em",
      "font-weight": function(d,i){
        if (i===0 ||  i==(_self.dataSet.length-1)) {
          return "bold"; }
        else {
          return "normal"; }
      }
    })
};

d3Draw.prototype.appendSvg = function (selector) {
  var h = this.svg_height;
  var w = this.svg_width;
  this.svg = d3.select(selector || 'body')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
};








