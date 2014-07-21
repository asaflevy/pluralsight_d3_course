$(function () {

  var draw = new d3Draw({
    'svg_width': 400,
    'svg_height':350,
    'dataSet': [
      {"month":10, "sales":100},
      {"month":20, "sales":130},
      {"month":30, "sales":250},
      {"month":40, "sales":300},
      {"month":50, "sales":265},
      {"month":60, "sales":225},
      {"month":70, "sales":180},
      {"month":80, "sales":120},
      {"month":90, "sales":145},
      {"month":100, "sales":130}
    ]
  });


});

function d3Draw(settings) {
  this.data = settings.data || {};
  $.extend(this, d3Draw.defaults, settings);
  this.appendSvg('div.svg');
  this.draw_circle();
  this.drawLabel();
}

d3Draw.defaults = {
  'svg_height': 400,
  'svg_width': 200,
  'dataSet': [],
  'padding': 2
};





d3Draw.prototype.draw_circle = function () {
  var h = this.svg_height;
  var w = this.svg_width;
  var _self = this;
  //KPI color
  function salesKPI (d) {
    if (d>=250) { return "#33CC66"; } else
    if (d<250) { return "#666666"; }
  }
  this.svg.selectAll('circle')
    .data(this.dataSet)
    .enter()
    .append('circle')
    .attr({
      cx: function(d){ return d.month*3; },
      cy: function(d){ return h-d.sales; },
      r:  5,
      "fill": function(d){ return salesKPI(d.sales); }
    })
};

d3Draw.prototype.drawLabel = function(){
  var h = this.svg_height;
  var w = this.svg_width;
  var _self = this;
  function showMinMax(ds, col, val, type){
    var max = d3.max(ds, function(d) { return d[col]; } );
    var min = d3.min(ds, function(d) { return d[col]; } );

    if (type=='minmax' && (val == max || val == min)) {
      return val;
    } else

    if (type=='all') {
      return val;
    }

  }
  this.svg.selectAll('text')
    .data(this.dataSet)
    .enter()
    .append('text')
    .text(function(d){ return showMinMax(_self.dataSet, 'sales', d.sales, 'minmax'); })
    .attr({
      x: function(d){ return (d.month*3)-25; },
      y: function(d){ return h-d.sales; },
      "font-size": "12px",
      "font-family": "sans-serif",
      "fill": "#666666",
      "text-anchor": "start"
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








