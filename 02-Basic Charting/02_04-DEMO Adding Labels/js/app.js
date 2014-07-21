$(function () {

  var draw = new d3Draw({
    'svg_width': 300,
    'svg_height': 200,
    'dataSet': [110, 20, 30, 5, 20, 59, 30]
  });


});

function d3Draw(settings) {
  this.data = settings.data || {};
  $.extend(this, d3Draw.defaults, settings);
  this.appendSvg('div.svg');
  this.draw();
  this.drawLabel();
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
  var colorPicker = function (val) {
    console.log(val);
    if (val > 40) {
      return "#FF0033"
    } else {
      return "#666666"
    }
  };
  this.svg.selectAll('rect')
    .data(this.dataSet)
    .enter()
    .append('rect')
    .attr({
      x: function (d, i) {
        return (i * (w / _self.dataSet.length))
      },
      y: function (d) {
        return h - (d)
      }, // start from bottom
      height: function (d) {
        return d
      },
      width: w / this.dataSet.length - _self.padding})
    .style('fill', function (d) {
      return  colorPicker(d)
    })
};

d3Draw.prototype.drawLabel = function () {
  var _self = this;
  var h = this.svg_height;
  var w = this.svg_width;
  this.svg.selectAll('text')
    .data(_self.dataSet)
    .enter()
    .append('text')
    .text(function (d) {
      return d
    })
    .attr({
      'text-anchor': 'middle',
      x: function (d, i) {
        return (i * (w / _self.dataSet.length) +(w/_self.dataSet.length-_self.padding)/2)
      },
      y: function (d) {
        return h - (d)+15
      }, // start from bottom
      "font-size":12,
      'fill':'#FFFFFF'
    })

}

d3Draw.prototype.appendSvg = function (selector) {
  var h = this.svg_height;
  var w = this.svg_width;
  this.svg = d3.select(selector || 'body')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
};








