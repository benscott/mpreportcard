App.module('MP', function (MP) {
    MP.BarChartView = Marionette.ItemView.extend({
        template: _.template('<div></div>' +
            '<p><%= status_description %> of &pound;<%= value.toLocaleString() %>, <%= status %>.</p>'),
        minimum: 0.02,

        templateHelpers: function () {
            return {
              status: this.options.status,
              status_description: this.options.status_description,
              value: this.options.value,
              average: this.options.average
            };
          },
        initialize: function () {
            this.max = this.options.average * 2;

            // Use the getter so we have access to the default
            var min = Marionette.getOption(this, "minimum")

            var status

            if(this.options.value == this.options.average){
                status = 'is average for MPs'
            }else if(this.options.value >= (this.options.average)){
                status = '<strong>above</strong> the MP average of &pound;' + this.options.average.toLocaleString()
            }else{
                status = '<strong>below</strong> the MP average of &pound;' + this.options.average.toLocaleString()
            }

            this.options.status = status

            // We always want to show a little bar, so if the value is
            // Too small, pad it to 2%
            if ((this.options.value / this.max) < min) {
                this.options.bar_value = this.max * min
            }else{
                this.options.bar_value = this.options.value
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
                .data([this.options.bar_value])
                .enter().append("rect")
                .style("fill", "url(#gradient)")
                .attr("width", x)
                .attr("height", 10)

//            $(this.el).append('<p>' +this.status+ '</p>')


        }
    });
});
