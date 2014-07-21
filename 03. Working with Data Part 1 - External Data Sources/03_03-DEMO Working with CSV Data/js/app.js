$(function () {

  var draw = new d3Draw({
    'svg_width': window.innerWidth,
    'svg_height': 200,
    'dataSet': null
  });


});

function d3Draw(settings) {
  this.data = settings.data || {};
  $.extend(this, d3Draw.defaults, settings);
  var _self= this;
  d3.csv("../../Data/MonthlySales.csv", function(error, data) {
    //check the file loaded properly
    if (error) {  //is there an error?
      console.log(error);  //if so, log it to the console
    } else {      //If not we're golden!
      console.log(data);   //Now show me the money!
      _self.dataSet=data;
    }

    _self.appendSvg('div.svg');
    _self.build_line_fun();
    _self.draw();
    _self.showTotals();

  });

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
  .x(function (d) { return ((d.month-20130001)/3.25); })
  .y(function (d) { return h-d.sales; })
  .interpolate("linear");
};



d3Draw.prototype.showTotals = function(){

  // var salesTotal = d3.sum(this.dataSet['sales']);
  // var salesTotal = d3.merge(this.dataSet);

  var _self = this;
  this.salesTotal = 0;
  this.salesAvg = 0;
  this.metrics = [];
  //sum total
  for (var i = 0; i < this.dataSet.length; i++) {
    this.salesTotal += this.dataSet[i]['sales']*1; //*1 to make it a number
  };

  this.salesAvg = this.salesTotal / this.dataSet.length;

  //add metrics to array
  this.metrics.push("Sales Total: " + this.salesTotal);
  this.metrics.push("Sales Avg: "+this.salesAvg.toFixed(2));


  var t = d3.select("body").append("table");

  //now add total
  var tr = t.selectAll("tr")
    .data(this.metrics)
    .enter()
    .append("tr")
    .append("td")
    .text(function(d){ return d; });


};

d3Draw.prototype.appendSvg = function (selector) {
  var h = this.svg_height;
  var w = this.svg_width;
  this.svg = d3.select(selector || 'body')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
};








