App.module('MP', function (MP) {
    MP.BarChartView = Marionette.ItemView.extend({
        template: _.template('<div></div><p><%= status %></p>'),
        minimum: 0.02,
        tolerance: 0.1, // Percentage amount a value can be out by and considered average (10%)

        templateHelpers: function () {
            return {
              status: this.options.status
            };
          },
        initialize: function () {
            this.max = this.options.average * 2;

            // Is this below/above average
            // Get the tolerance value - the amount a value cna be out by and considered average
           var tolerance_value = Marionette.getOption(this, "tolerance") * this.max

            // Use the getter so we have access to the default
            var min = Marionette.getOption(this, "minimum")

            var status

            if(this.options.value >= (this.options.average - tolerance_value) && this.options.value <= (this.options.average + tolerance_value)){
                status = 'average'
            }else if(this.options.value >= (this.options.average)){
                status = 'above'
            }else{
                status = 'below'
            }

            this.options.status = status

            // We always want to show a little bar, so if the value is
            // Too small, pad it to 2%
            if ((this.options.value / this.max) < min) {
                this.options.value = this.max * min
            }

        },
        onRender: function(){
            var chart = d3.select(this.el).select('div').append("svg") // creating the svg object inside the container div
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
                .attr("offset", "47%")
                .attr("stop-color", "#FCC308")
                .attr("stop-opacity", 1);

            gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", "#55BA09")
                .attr("stop-opacity", 1);


            // takes the fixed width and creates the percentage from the data values
            var x = d3.scale.linear().domain([0, this.max]).range([0, 180]);

            // Create the bars
            chart.selectAll("rect")
                .data([this.options.value])
                .enter().append("rect")
                .style("fill", "url(#gradient)")
                .attr("width", x)
                .attr("height", 10)

//            $(this.el).append('<p>' +this.status+ '</p>')


        }
    });
});
