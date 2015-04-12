App.module('Stats', function (Stats) {
    Stats.BarChartView = Marionette.ItemView.extend({
        initialize: function () {

        },
        render: function () {

            // http://hdnrnzk.me/2012/07/04/creating-a-bar-graph-using-d3js/

            colors = {
                'Labour': '#E00600',
                'Cons': '#0061C8',
                'Lib Dem': '#FEB000',
                'UKIP': '#5B0066',
                'SDLP': '#0C5C40',
                'Green': '#78b82a',
                'DUP': '#CA5438',
                'Alliance': '#EFCE00',
                'Plaid Cymru': '#31751A',
                'SNP': '#FFF771',
                'Sinn Fein': '#087E30',
                'Independent': '#888888',
                'Respect': '#366C15'
            }

            var names = _.keys(this.options.data),
                data = _.values(this.options.data),
                width = 800,
                bar_height = 20,
                height = bar_height * names.length,
                left_width = 70;

            // Create the chart
            var chart = d3.select(this.el)
                .append('svg')
                .attr('class', 'chart')
                .attr('width', left_width + width)
                .attr('height', height + 30);

            // Create the bars
            var x, y;
            x = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range([0, width]);

            y = d3.scale.ordinal()
                .domain(data)
                .rangeBands([0, height]);

            xAxis = d3.svg.axis()
                .scale(x)
                .tickFormat(function (d) {
                    return approximateNumber(d);
                })
                .tickSize(-height)
                .tickSubdivide(true)

            chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + left_width + "," + height + ")")
                .call(xAxis);

            chart.append("g").selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("x", left_width)
                .attr("y", y)
                .attr("width", x)
                .attr("height", y.rangeBand())
                .style("fill", function (d, i) {
                    return colors[names[i]]
                });

            chart.append("g").selectAll("text")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    // Pad it out if it's too short
                    if(x(d) < 50){
                        return 25 + left_width
                    }else{
                        return x(d) + left_width
                    }
                })
                .attr("y", function (d) {
                    return y(d) + y.rangeBand() / 2;
                })
                .attr("dx", -5)
                .attr("dy", ".36em")
                .attr("text-anchor", function(d){
                    if(x(d) < 50){
                        return 'left'
                    }else{
                        return 'end'
                    }
                })
                .text(function(d){
                    return approximateNumber(d);
                }).attr('class', 'value')
                .style("fill", function(d){
                    if(x(d) < 40){
                        return '#888888'
                    }else{
                        return 'white'
                    }
                });

            chart.append("g").selectAll("text.name")
                .data(names)
                .enter().append("text")
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return y(data[i]) + y.rangeBand() / 2;
                })
                .attr("dy", ".36em")
                .attr("text-anchor", "left")
                .attr('class', 'name')
                .text(String)
                .style("font-size", "11px");

        }
    });
});