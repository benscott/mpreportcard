App.module('MP', function (MP) {
    MP.DonutChartView = Marionette.ItemView.extend({
        width: 200,
        height: 200,

        render: function () {

            console.log(this.options.data);

            var dataset = this.options.data;

            var color = d3.scale.category20();
            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) {
                    return d.v;
                });

            var width = Marionette.getOption(this, "width"),
                height = Marionette.getOption(this, "height"),
                radius = Math.min(width, height) / 2;

            var radius = radius = Math.min(width, height) / 2;

            var pieData = pie(dataset);

            var arc = d3.svg.arc()
                .outerRadius(radius - 45)
                .innerRadius(radius - 60);

            var svg = d3.select(this.el).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var path = svg.selectAll("path")
                .data(pieData)
              .enter().append("path")
                .attr("fill", function(d, i) { return color(i); })
                .attr("d", arc)
            .on("mouseenter", function(d) {
                   console.log(d);
                });

            svg.selectAll("text").data(pieData)
                .enter()
                .append("text")
                .attr("text-anchor", "middle")
                .attr("x", function(d) {
                    var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
                    d.cx = Math.cos(a) * (radius - 75);
                    return d.x = Math.cos(a) * (radius - 20);
                })
                .attr("y", function(d) {
                    var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
                    d.cy = Math.sin(a) * (radius - 65);
                    return d.y = Math.sin(a) * (radius - 20);
                })
                .text(function(d) {
                    return d.data.k
                })
                .style("font-size", "10px");


        }
    });
});
