$(function(){


d3.select('div.d3').append('svg')
  .append('rect')
  .attr('height',200)
  .attr('width',50)
  .style('fill','blue')


  // circle
  d3.select('div.circle').append('svg')
    .append('circle')
    .attr('cx',35)
    .attr('cy',35)
    .attr('r',25)
    .style('fill','blue')


  // circle
  d3.select('div.text').append('svg')
    .append('text')
    .text('Easy')
    .attr('x',5)
    .attr('y',15)


})