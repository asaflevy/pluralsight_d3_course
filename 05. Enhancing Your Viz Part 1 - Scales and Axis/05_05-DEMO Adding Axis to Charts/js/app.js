$(function () {

  var draw = new d3Draw({
    'svg_width': 500,//window.innerWidth,
    'svg_height': 200,
    'dataSet': null
  });


});

d3Draw.defaults = {
  'svg_height': 400,
  'svg_width': 200,
  'dataSet': [],
  'padding': 20
};

function d3Draw(settings) {
  this.data = settings.data || {};
  $.extend(this, d3Draw.defaults, settings);
  var _self = this;
  d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function (error, data) {
    //check the file loaded properly
    if (error) {  //is there an error?
      console.log(error);  //if so, log it to the console
    } else {      //If not we're golden!
      data = JSON.parse(window.atob(data.content));
      console.log(data);   //Now show me the money!
      _self.dataSet = data;
    }
    data['contents'].forEach(function (data) {
      _self.showHeader(data['category']);
      _self.appendSvg('div.svg');
      _self.build_line_fun(data['monthlySales']);
      _self.drawAxis();
      _self.draw(data['monthlySales']);


    })


  });

}



d3Draw.prototype.showHeader = function (header) {
  d3.select('div.svg').append('h1')
    .text(header)
}

d3Draw.prototype.draw = function (data) {

  var data_to_use = data || this.dataSet
  var _self = this;
  this.svg.append('path')
    .attr({
      d: this.lineFun(data_to_use),
      'stroke': 'red',
      'stroke-width': 4,
      'fill': 'none'
    })
};


d3Draw.prototype.build_line_fun = function (data) {
  var data_to_use = data || this.dataSet
  var h = this.svg_height;
  var w = this.svg_width;
  var _self = this;

  function getDate(d){

    //20130101
    var strDate = new String(d);

    var year = strDate.substr(0,4);
    var month = strDate.substr(4,2)-1; //zero based index
    var day = strDate.substr(6,2);

    return new Date(year, month, day);
  }
  console.log(data)
  var minDate = getDate(data[0]['month']);
  var maxDate = getDate(data[data.length-1]['month']);
  this.xScale = d3.time.scale()
    .domain([
      minDate ,
      maxDate
    ])
    .range([this.padding+5, w-this.padding])




  this.yScale = d3.scale.linear()
    .domain([0, d3.max(data_to_use, function(d){ return d.sales;})])
    .range([h-this.padding,10])
    .nice();



  this.lineFun = d3.svg.line()
    .x(function (d) {
      return _self.xScale(getDate(d.month))
    })
    .y(function (d) {
      return _self.yScale(d.sales)
    })
    .interpolate("linear");
};

d3Draw.prototype.drawAxis = function(){
  var h = this.svg_height;
  var w = this.svg_width;
  this.yAxisGen = d3.svg.axis().scale(this.yScale).orient("left").ticks(4);
  this.xAxisGen  = d3.svg.axis().scale(this.xScale).orient('bottom').tickFormat(d3.time.format("%b"));;
  this.yAxis = this.svg.append('g').call(this.yAxisGen)
    .attr("class", "axis")
    .attr("transform", "translate(" + this.padding + ", 0)");
  this.xAxis = this.svg.append('g').call(this.xAxisGen)
    .attr("class", "axis")
    .attr("transform", "translate( 0, " +(h-this.padding)+ " )");
};

d3Draw.prototype.appendSvg = function (selector) {
  var h = this.svg_height;
  var w = this.svg_width;
  this.svg = d3.select(selector || 'body')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
};








