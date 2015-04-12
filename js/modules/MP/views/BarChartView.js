App.module('MP', function (MP) {
    MP.BarChartView = Marionette.ItemView.extend({
        template: _.template('<div></div>' +
            '<p><%= status_text %>, <%= status %>.</p>'),
        minimum: 0.02,
        type: 'integer',

        templateHelpers: function () {
            return {
              status: this.status,
              status_text: this.options.status_text,
              value: this.options.value,
              average: this.options.average
            };
          },
        initialize: function () {

            var average

            if (this.options.type == 'money') {
                average = '&pound;' + this.options.average.toLocaleString()
            }
            else  if (this.options.type == 'percentage'){
                average = this.options.average + '%'
            }else{
                average = this.options.average.toLocaleString()
            }

            if(this.options.value == this.options.average){
                this.status = 'which is the MP average'
            }else if(this.options.value >= (this.options.average)){
                this.status = '<strong>above</strong> the MP average of ' + average
            }else{
                this.status = '<strong>below</strong> the MP average of ' + average
            }

            this.max = this.options.average * 2;
            // Use the getter so we have access to the default
            var min = Marionette.getOption(this, "minimum")

            // We always want to show a little bar, so if the value is
            // Too small, pad it to 2%
            if ((this.options.value / this.max) < min) {
                this.options.bar_value = this.max * min
            }else{
                this.options.bar_value = this.options.value
            }

        },
        onRender: function(){

            var redColor = "#FD4B04", greenColor = "#55BA09"

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
                .attr("stop-color", this.options.type == 'money' ? redColor : greenColor)
                .attr("stop-opacity", 1);

            gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", "#FCC308")
                .attr("stop-opacity", 1);

            gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", this.options.type == 'money' ? greenColor : redColor)
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
        }
    });
});
