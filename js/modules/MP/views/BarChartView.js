App.module('MP', function (MP) {
    MP.BarChartView = Marionette.ItemView.extend({
        tagName: 'svg',
        minimum: 0.02,
        initialize: function(){
            this.options.max = this.options.average * 2;
            // Use the getter so we have access to the default
            var min = Marionette.getOption(this, "minimum")

            // We always want to show a little bar, so if the value is
            // Too small, pad it to 2%
            if ((this.options.value / this.options.max) < min){
                this.options.value = this.options.max * min
            }
        },
        render: function () {

          var chart = d3.select(this.el).append("svg") // creating the svg object inside the container div
            .attr("class", "bar-chart")
            .attr("width", 180) // bar has a fixed width
            .attr("height", 10);

            // Create gradient
            var gradient = chart.append("svg:defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "100%")
                .attr("x2", "0")
                .attr("gradientUnits", "userSpaceOnUse")

                gradient.append("svg:stop")
                .attr("offset", "0%")
                .attr("stop-color", "#FD4B04")
                .attr("stop-opacity", 1);


                gradient.append("svg:stop")
                .attr("offset", "45%")
                .attr("stop-color", "#FCC308")
                .attr("stop-opacity", 1);

                gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", "#55BA09")
                .attr("stop-opacity", 1);


          // takes the fixed width and creates the percentage from the data values
          var x = d3.scale.linear().domain([0, this.options.max]).range([0, 180]);

          // Create the bars
          chart.selectAll("rect")
            .data([this.options.value])
          .enter().append("rect")
            .style("fill", "url(#gradient)")
            .attr("width", x)
            .attr("height", 10)


        }
    });
});
