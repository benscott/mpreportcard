App.module('MP', function (MP) {
    MP.DonutChartView = Marionette.ItemView.extend({
        width: 200,
        height: 200,

        render: function () {

//            var dataset = {
//                apples: [53245, 28479, 19697, 24037, 40245]
//            };

            var color = d3.scale.category20();
            var pie = d3.layout.pie()
                .sort(null);

            var width = 200,
                height = 200,
                radius = Math.min(width, height) / 2;

            var radius = radius = Math.min(width, height) / 2;

            var piedata = pie(dataset.apples);

            var arc = d3.svg.arc()
                .innerRadius(radius - 100)
                .outerRadius(radius - 50);

            var svg = d3.select(this.el).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var path = svg.selectAll("path")
                .data(piedata)
              .enter().append("path")
                .attr("fill", function(d, i) { return color(i); })
                .attr("d", arc);

            svg.selectAll("text").data(piedata)
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
                    d.cy = Math.sin(a) * (radius - 75);
                    return d.y = Math.sin(a) * (radius - 20);
                })
                .text(function(d) {
                    console.log(d);
                    return d.value;
                })


        }
    });
});
