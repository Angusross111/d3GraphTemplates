
const svg = d3.select('.canvas')
.append('svg')
    .attr('width','100%')
    .attr('height',400);

const margin = {top:20, right:20, bottom:50, left:50};
const graphWidth =  svg.node().getBoundingClientRect().width - margin.left - margin.right;
const graphHeight = 400-margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width',graphWidth)
    .attr('height',graphHeight)
    .attr('transform',`translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph.append('g')
    .attr('transform',`translate(0,${graphHeight})`);
const yAxisGroup = graph.append('g');


d3.json('hours.json').then(data => {

    const y = d3.scaleLinear()
        .domain([0,24])
        .range([graphHeight,0]);

    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0,graphWidth])
        .paddingInner(0.1)
        .paddingOuter(0.1);

    const rect = graph.selectAll('rect')
        .data(data);

    rect.attr('x', d => x(d.name))
        .attr('y', d => y(d.running))
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.running))
        .attr('fill', "green");

    rect.enter()
        .append('rect')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.running))
            .attr('width', x.bandwidth)
            .attr('height', d =>graphHeight - y(d.running))
            .attr('fill', "green");

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)


});

