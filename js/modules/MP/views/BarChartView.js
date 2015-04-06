App.module('MP', function (MP) {
    MP.BarChartView = Marionette.ItemView.extend({
        tagName: 'svg',
        render: function () {

          var data = [560, 350]; // here are the data values; v1 = total, v2 = current value

          var chart = d3.select(this.el).append("svg") // creating the svg object inside the container div
            .attr("class", "chart")
            .attr("width", 200) // bar has a fixed width
            .attr("height", 20 * data.length);

          var x = d3.scale.linear() // takes the fixed width and creates the percentage from the data values
            .domain([0, d3.max(data)])
            .range([0, 200]);

          chart.selectAll("rect") // this is what actually creates the bars
            .data(data)
          .enter().append("rect")
            .attr("width", x)
            .attr("height", 20)

          chart.selectAll("text") // adding the text labels to the bar
            .data(data)
          .enter().append("text")
            .attr("x", x)
            .attr("y", 10) // y position of the text inside bar
            .attr("dx", -3) // padding-right
            .attr("dy", ".35em") // vertical-align: middle
            .attr("text-anchor", "end") // text-align: right
            .text(String);

        }
    });
});
