App.module('Stats', function (Stats) {
    Stats.DatasetChartView = Marionette.ItemView.extend({
        template: '#stats-dataset-graph',
        width: 1200,
        bar_height: 25,
        left_width: 70,
//        ui: {
//
//        },
//        events: {
//
//        },
//        initialize: function () {
//            console.log(this.collection.length);
//        },


        onRender: function () {

            // http://viralfsharp.com/2014/02/25/d3-fisheye-distortion-for-bar-charts/
            // http://jsfiddle.net/fierval/f4hna/

            var width = 960,
            height = 500,
            padding = {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5

            }
//            p = [5, 5, 10, 10]
//
//            console.log(w - p[1] - p[3]);
//
//            //fisheye distortion scale
//            x = d3.fisheye.ordinal().rangeRoundBands([0, w - padding.right - padding.left]).distortion(0.9),
//
//            y = d3.scale.linear().range([0, h - padding.bottom - padding.top]),
//            z = d3.scale.ordinal().range(["lightpink", "darkgray", "lightblue"]),
            parse = d3.time.format("%m/%Y").parse
//            format = d3.time.format("%b");
//

//
//            var data = this.collection.get_stats(type)
//
            var crimea_raw = d3.select("#csvdata").text();
            var crimea = d3.csv.parse(crimea_raw);
//
//            var causes = d3.layout.stack()(["wounds", "other", "disease"].map(function(cause) {
//                return crimea.map(function(d) {
//                    return {x: parse(d.date), y: +d[cause]};
//                });
//            }));
//
//            console.log(crimea);
//
//            data = []
//
//            _.each(crimea, function (obj) {
//              data.push({x:  parse(obj.date), y: obj.disease})
//            })

//            data = [
//                {x: 'one', y: 1},
//                {x: 'two', y: 2},
//                {x: 'three', y: 3},
//                {x: 'g', y: 4},
//                {x: 'h', y: 5},
//                {x: 'j', y: 6}
//            ]

            var svg = d3.select(this.el).append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")");

            var barWidth = width / data.length;

            var y = d3.scale.linear().range([height, 0]);

            y.domain([0, d3.max(data, function(d){
                return d.y;
            })]);

            x = d3.fisheye.ordinal().rangeRoundBands([0, width - padding.right - padding.left]).distortion(0.9),
            x.domain(data.map(function(d) { return d.x; }));

            // Add a group for each cause.
            var bars = svg.selectAll("g.bars")
            .data(data)
            .enter().append("svg:g")
            .attr("class", "bars")
            .style("fill", function(d, i) {
                    if(i % 2){
                        return 'pink'
                    }else{
                        return 'yellow'
                    }
//                    return 'pink'
                })

            // Add a rect for each date.
            var rect = bars.append("svg:rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); })
            .attr("width", function(d) {
                    return x.rangeBand(d.x);
                })

//            var bar = svg.selectAll("g")
//                .data(data)
//                .enter().append("g")
////                .attr("transform", function (d, i) {
////                    return "translate(" + i * barWidth + ",0)";
////                });
//
//            var rect = bar.append("rect")
//                .attr("x", function(d) { return x(d.x); })
//                .attr("y", function (d) {
//                    return y(d.y);
//                })
//                .attr("height", function (d) {
//                    return height - y(d.y);
//                })
//                .attr("width", function(d) {return x.rangeBand(d.x);})
//                .style("fill", function (d) {
//                    return 'red'
//                })

            //respond to the mouse and distort where necessary
            svg.on("mousemove", function() {
                var mouse = d3.mouse(this);

                //refocus the distortion
                x.focus(mouse[0]);
                //redraw the bars
                rect
                .attr("x", function(d) { return x(d.x); })
                .attr("width", function(d) {return x.rangeBand(d.x);});

                //redraw the text
//                label.attr("x", function(d) { return x(d) + x.rangeBand(d.x) / 2; });
            });

//            x.domain(causes.map(function(d) { return d.x; }));
//
//            // Transpose the data into layers by cause.
//            var causes = d3.layout.stack()(["wounds", "other", "disease"].map(function(cause) {
//                return crimea.map(function(d) {
//                    return {x: parse(d.date), y: +d[cause]};
//                });
//            }));

//            var q = causes[0].map(function(d) { return d.x; })
//            console.log(q)
//
//
//            causes = [
//                {x: 'one', y: 1},
//                {x: 'two', y: 2},
//                {x: 'three', y: 3}
//            ]

//            console.log(causes.map(function(d) { return d.x; }));

//            console.log(causes);


            // Compute the x-domain (by date) and y-domain (by top).
//            x.domain(causes[0].map(function(d) { return d.x; }));

//            y.domain([0, d3.max(causes[causes.length - 1], function(d) {
////                console.log(d);
//                return d.y0 + d.y;
//            })]);
//
////            tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return 'HELLO' });
////            svg.call(tip)
//
//            // Add a group for each cause.
//            var cause = svg.selectAll("g.cause")
//            .data(causes)
//            .enter().append("svg:g")
//            .attr("class", "cause")
//            .style("fill", function(d, i) { return z(i); })
//
//            // Add a rect for each date.
//            var rect = cause.selectAll("rect")
//            .data(Object)
//            .enter().append("svg:rect")
//            .attr("x", function(d) { return x(d.x); })
//            .attr("y", function(d) { return -y(d.y0) - y(d.y); })
//            .attr("height", function(d) { return y(d.y); })
//            .attr("width", function(d) {
////                    console.log(d.x)
//                    return x.rangeBand(d.x);
//                })
//                            .on('mouseover', tip.show)
//                .on('mouseout', tip.hide)

//            var crimea_raw = d3.select("#csvdata").text();
//            var crimea = d3.csv.parse(crimea_raw);
//
//            // Transpose the data into layers by cause.
//            var causes = d3.layout.stack()(["wounds", "other", "disease"].map(function(cause) {
//                return crimea.map(function(d) {
//                    return {x: parse(d.date), y: +d[cause]};
//                });
//            }));
//
////            console.log(causes);
//
//
//            // Compute the x-domain (by date) and y-domain (by top).
//            x.domain(causes[0].map(function(d) { return d.x; }));
//
//            console.log(x)
//
//            y.domain([0, d3.max(causes[causes.length - 1], function(d) {
////                console.log(d);
//                return d.y0 + d.y;
//            })]);
//
//            tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return 'HELLO' });
//            svg.call(tip)
//
//            // Add a group for each cause.
//            var cause = svg.selectAll("g.cause")
//            .data(causes)
//            .enter().append("svg:g")
//            .attr("class", "cause")
//            .style("fill", function(d, i) { return z(i); })
//
//            // Add a rect for each date.
//            var rect = cause.selectAll("rect")
//            .data(Object)
//            .enter().append("svg:rect")
//            .attr("x", function(d) { return x(d.x); })
//            .attr("y", function(d) { return -y(d.y0) - y(d.y); })
//            .attr("height", function(d) { return y(d.y); })
//            .attr("width", function(d) {
////                    console.log(d.x)
//                    return x.rangeBand(d.x);
//                })
//                            .on('mouseover', tip.show)
//                .on('mouseout', tip.hide)




//            // Add a label per date.
//            var label = svg.selectAll("text")
//            .data(x.domain())
//            .enter().append("svg:text")
//            .attr("x", function(d) { return x(d) + x.rangeBand(d) / 2; })
//            .attr("y", 6)
//            .attr("text-anchor", "middle")
//            .attr("dy", ".71em")
//            .text(format);

//            // Add y-axis rules.
//            var rule = svg.selectAll("g.rule")
//            .data(y.ticks(5))
//            .enter().append("svg:g")
//            .attr("class", "rule")
//            .attr("transform", function(d) { return "translate(0," + -y(d) + ")"; });
//
//            rule.append("svg:line")
//            .attr("x2", w - p[1] - p[3])
//            .style("stroke", function(d) { return d ? "#fff" : "#000"; })
//            .style("stroke-opacity", function(d) { return d ? .7 : null; });
//
//            rule.append("svg:text")
//            .attr("x", w - p[1] - p[3] + 6)
//            .attr("dy", ".35em")
//            .text(d3.format(",d"));

            //respond to the mouse and distort where necessary
//            svg.on("mousemove", function() {
//                var mouse = d3.mouse(this);
//
//                //refocus the distortion
//                x.focus(mouse[0]);
//                //redraw the bars
//                rect
//                .attr("x", function(d) { return x(d.x); })
//                .attr("y", function(d) { return -y(d.y0) - y(d.y); })
//                .attr("width", function(d) {return x.rangeBand(d.x);});
//
//                //redraw the text
////                label.attr("x", function(d) { return x(d) + x.rangeBand(d) / 2; });
//            });

















//            http://bl.ocks.org/mbostock/6123708

//            var data = this.collection.get_stats(type)
//
//            var width = 960,
//                height = 400
//                p = [20, 50, 30, 20]
//
//            var x = d3.fisheye.ordinal().rangeRoundBands([0, width - p[1] - p[3]]).distortion(0.9);
//
//            console.log(x.rangeBand(1,2));
//
//            var y = d3.scale.linear().range([height, 0]);
//
//            y.domain([0, d3.max(data, function(d){
//                return d.value;
//            })]);
//
//            var zoom = d3.behavior.zoom().scaleExtent([1, 5]).on("zoom", zoomed);
//
//            var fisheye = d3.fisheye.circular()
//                .radius(200)
//                .distortion(2);
//
//            var svg = d3.select(this.el).append("svg")
//                .attr("width", width)
//                .attr("height", height)
//                .append("g")
////                .call(fisheye)
////                .append("g");
//
//            var barWidth = width / data.length;
//
////            svg.append("rect")
////                .attr("y", function (d) {
////                    return y(d.value);
////                })
////                .attr("height", function (d) {
////                    return height - y(d.value);
////                })
////                .attr("width", barWidth)
////                .style("fill", function (d) {
////                    return colors[d.party]
////                })
////                .on('mouseover', tip.show)
////                .on('mouseout', tip.hide)
////                .on('click', function(){
////                    console.log('click')
////                })
//
////            svg.append("rect")
////                .attr("class", "overlay")
////                .attr("width", width)
////                .attr("height", height);
////
////            svg.selectAll("circle")
////                .data(data)
////                .enter().append("circle")
////                .attr("r", 2.5)
////                .attr("transform", function (d) {
////                    return "translate(" + d + ")";
////                });
//
//            var bar = svg.selectAll("g")
//                .data(data)
//                .enter().append("g")
//                .attr("transform", function (d, i) {
//                    return "translate(" + i * barWidth + ",0)";
//                });
//
//            var rect = bar.append("rect")
//                .attr("y", function (d) {
//                    return y(d.value);
//                })
//                .attr("height", function (d) {
//                    return height - y(d.value);
//                })
//                .attr("width", function(d) {return x.rangeBand(2)})
//                .style("fill", function (d) {
//                    return colors[d.party]
//                })
//
//            function zoomed() {
//                svg.attr("transform",
//                        "translate(" + d3.event.translate[0] + ",0)" +
//                        "scale(" + d3.event.scale + ", 1)"
//                );
//            }
//
//    svg.on("mousemove", function() {
//
//        var mouse = d3.mouse(this);
//
//        //refocus the distortion
//        x.focus(mouse[0]);
//        //redraw the bars
//        rect
//        .attr("x", function(d) { return x(d.x); })
//        .attr("width", function(d) {return x.rangeBand(d.x);});
//
//
//    });




//            // Create the chart
//            var chart = d3.select(this.el).select('div')
//                .append('svg')
//                .attr('class', 'chart')
//                .attr("width", width)
//                .attr("height", height)
//                .call(zoom);
//

//
//            tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.value; });
//            chart.call(tip)
//
//
//
////            var drag = d3.behavior.drag()
////                .origin(function(d) { return d; })
////                .on("dragstart", dragstarted)
////                .on("drag", dragged)
////                .on("dragend", dragended);
//
//            var barWidth = width / data.length;
//
//            var bar = chart.selectAll("g")
//                .data(data)
//                .enter().append("g")
//                .attr("transform", function (d, i) {
//                    return "translate(" + i * barWidth + ",0)";
//                });
//
//            bar.append("rect")
//                .attr("y", function (d) {
//                    return y(d.value);
//                })
//                .attr("height", function (d) {
//                    return height - y(d.value);
//                })
//                .attr("width", barWidth)
//                .style("fill", function (d) {
//                    return colors[d.party]
//                })
//                .on('mouseover', tip.show)
//                .on('mouseout', tip.hide)
//                .on('click', function(){
//                    console.log('click')
//                })
//
//                function zoomed() {
//
//                    console.log('ZOOM');
//                  bar.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//                }

//            bar.append("text")
//                .attr("x", barWidth / 2)
//                .attr("y", function (d) {
//                    return y(d.get('debates')) + 3;
//                })
//                .attr("dy", ".75em")
//                .text(function (d) {
//                    return d.get('debates');
//                });


        }
    });
});