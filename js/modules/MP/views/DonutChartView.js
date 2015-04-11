App.module('MP', function (MP) {
    MP.DonutChartView = Marionette.ItemView.extend({
        width: 230,
        height: 120,

        midAngle: function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        },

        render: function () {
            var self = this
            var baseColor = d3.rgb("#D9D9D9")

            var svg = d3.select(this.el)
                .append("svg")
                .append("g")

            svg.append("g")
                .attr("class", "slices");
            svg.append("g")
                .attr("class", "labels");
            svg.append("g")
                .attr("class", "value");
            svg.append("g")
                .attr("class", "lines");

            var width = Marionette.getOption(this, "width"),
                height = Marionette.getOption(this, "height"),
                radius = Math.min(width, height) / 2;

            var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d.v;
                });

            var arc = d3.svg.arc()
                .outerRadius(radius * 0.8)
                .innerRadius(radius * 0.4);

            var outerArc = d3.svg.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 0.9);

            svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var key = function (d) {
                return d.data.k;
            };

            /* -------  SLICES -------*/
            var slice = svg.select(".slices").selectAll("path.slice")
                .data(pie(this.options.data), key);

            slice.enter()
                .insert("path")
                .attr("fill", function (d, i) {
                    return baseColor.darker(i / 5);
                })
                .attr("d", arc)

            /* ------- VALUE -------*/
            var value = svg.select(".value")
                .append("text")
                .attr("y", 4)
                .attr("z", -1)  // Works better with a pound sign
                .style("font-size", "14px")
                .style("text-anchor", "middle")

            /* ------- LABELS -------*/
            var text = svg.select(".labels").selectAll("text")
                .data(pie(this.options.data), key);

            text.enter()
                .append("text")
                .style("font-size", "11px")
                .style("padding", "2px")
                .style("cursor", "default")  // Disable text cursor
                .attr("dy", ".35em")
                .attr("x", function (d) {
                    return radius * (self.midAngle(d) < Math.PI ? 1 : -1);
                })
                .attr("y", function (d) {
                    var pos = outerArc.centroid(d);
                    return pos[1]
                })
                .attr("text-anchor", function (d) {
                    // Should text be anchored start or end (whether it's left or right)
                    return self.midAngle(d) < Math.PI ? "start" : "end";
                })
                .text(function (d) {
                    return d.data.k;
                })
                .on("mouseover", function (d) {
                    value.html('&pound;' + d.value.toLocaleString())
                    value.transition()
                        .duration(100)
                        .style("opacity", .9);

                })
                .on("mouseout", function (d) {
                    value.transition()
                        .duration(200)
                        .style("opacity", 0);
                });


            /* -------  POLYLINES -------*/
            var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(this.options.data), key);

            polyline.enter()
                .append("polyline")
                .attr("points", function (d) {
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 0.95 * (self.midAngle(d) < Math.PI ? 1 : -1);
                    return [arc.centroid(d), outerArc.centroid(d), pos];
                });


        }

    });
});
