App.module('Stats', function (Stats) {
    var partyMembers;
    Stats.BarChartView = Marionette.ItemView.extend({
        template: '#stats-total-graph',
        width: 800,
        bar_height: 25,
        left_width: 70,
        colors: {
            'Labour': '#E00600',
            'Conservative': '#0061C8',
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
        },
        ui: {
            radio: "#average-or-total input:radio",
            radioWrapper: '#average-or-total',
            select: "select"
        },

        events: {
            'change @ui.radio': 'changeGraphType',
            'change @ui.select': 'changeGraphType'
        },
        initialize: function () {

            // We want to access partyMembers in our tooltip
            // So create outside of 'this'
            partyMembers = this.model.get('party_members')
        },

        getDataType: function (source) {
            var dataTypes = {
                'financial_interests': 'currency',
                'expenses': 'currency',
                'votes': 'percent',
                'replies': 'percent'
            }
            if (_.isUndefined(dataTypes[source])) {
                // Default type is numeric
                return 'numeric'
            } else {
                return dataTypes[source]
            }

        },

        changeGraphType: function () {

            // Based on: https://gist.github.com/enjalot/1429426

            // Do we want to display total or averages
            var totalOrAverage = this.ui.radio.filter(':checked').val(),
            // Are we displaying financial interests etc.,
                dataSource = this.ui.select.val(),
                data,
                xMax,
                dataType = this.getDataType(dataSource),
                toolTip

            // Crate the tooltip type - percent, currency_total, numeric_average etc.,
            if (dataType == 'percent') {
                toolTip = this.toolTip(dataType)

                // We also want to hide the total/average options for percentage types
                data = this.model.get(dataSource)
                this.ui.radioWrapper.hide()

            } else {
                toolTip = this.toolTip(dataType + '_' + totalOrAverage)

                if (totalOrAverage == 'average') {
                    data = this.model.get_averages(dataSource)
                } else {
                    data = this.model.get(dataSource)
                }

                this.ui.radioWrapper.show()
            }

            self.tip.html(toolTip)

            // Convert dict to .key and .value
            data = d3.entries(data)

            var height = this.getHeight(data)

            var chart = d3.select(this.el).select('div')
            var bar = chart.selectAll("rect")
                .data(data)

            // If this is percentage, we want to scale to 100%
            // We use 105 to create space for the labels
            if (dataType == 'percent') {
                xMax = 105
            } else {
                xMax = d3.max(data, function (d) {
                    return d.value;
                })
            }

            var x = d3.scale.linear()
                .domain([0, xMax])
                .range([2, Marionette.getOption(this, "width")]);

            var xAxis = this._get_xAxis(x, height)

            bar.enter().append("rect")
                .attr("class", "bar")
                .attr("x", Marionette.getOption(this, "left_width"))
                .attr("width", x)

            // remove data:
            bar.exit().remove();
            // updated data:
            bar.transition().duration(500)
                .attr("width", function (d) {
                    return x(d.value)
                })

            // change the x axis
            chart.select(".x-axis").transition()
                .duration(750)
                .call(xAxis);

        },

        getHeight: function(data){
            return Marionette.getOption(this, "bar_height") * data.length
        },

        onRender: function () {

            // http://hdnrnzk.me/2012/07/04/creating-a-bar-graph-using-d3js/

            // By default, we want to use the financial interests
            var defaultSource = 'financial_interests',
                data = this.model.get(defaultSource),
                dataType = this.getDataType(defaultSource),
                colors = Marionette.getOption(this, "colors")

            // Convert dict to .key and .value
            data = d3.entries(data)

            var width = Marionette.getOption(this, "width"),
                height = this.getHeight(data),
                left_width = Marionette.getOption(this, "left_width"),
                toolTip = this.toolTip(dataType + '_total')  // Tooltip for financial_interests

            // Create the chart
            var chart = d3.select(this.el).select('div')
                .append('svg')
                .attr('class', 'chart')
                .attr('width', left_width + width)
                .attr('height', height + 30);

            // Create the bars
            var x, y;

            x = d3.scale.linear()
                .domain([0, d3.max(data, function (d) {
                    return d.value;
                })])
                .range([2, Marionette.getOption(this, "width")]);

            var xAxis = this._get_xAxis(x, height)

            y = d3.scale.ordinal()
                .domain(data.map(function (d) {
                    return d.key;
                }))
                .rangeBands([0, height]);

            chart.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(" + left_width + "," + height + ")")
                .call(xAxis);

            /* Initialize tooltip */
            self.tip = d3.tip()
                .attr('class', 'd3-tip')
                //
                .html(toolTip)
                .direction('e')
                .offset([0, 10])

            chart.call(self.tip)

            // Add the bars
            chart.append("g").selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("x", left_width)
                .attr("y", function (d) {
                    return y(d.key)
                })
                .attr("width", function (d) {
                    return x(d.value)
                })
                .attr("height", y.rangeBand())
                .style("fill", function (d) {
                    return colors[d.key]
                })
                .on('mouseover', self.tip.show)
                .on('mouseout', self.tip.hide)

            chart.append("g").selectAll("text.name")
                .data(data)
                .enter().append("text")
                .attr("x", 0)
                .attr("y", function (d) {
                    return y(d.key) + y.rangeBand() / 2;
                })
                .attr("dy", ".36em")
                .attr("text-anchor", "left")
                .attr('class', 'name')
                .text(function (d) {
                    return d.key
                })
                .style("font-size", "11px");

        },

        _get_xAxis: function (x, height) {
            return d3.svg.axis()
                .scale(x)
                .ticks(6)
                .tickSize(-height)
                .tickPadding(8)
                .tickFormat(function (d) {
                    return approximateNumber(d);
                })
                .tickSubdivide(true)
        },

        toolTip: function (type) {

            switch (type) {
                case 'percent':
                    return function (d) {
                        return d.value + '&percnt;'
                    }
                case 'currency_total':
                    return function (d) {
                        return '&pound;' + d.value.toLocaleString()
                    }
                case 'numeric_total':
                    return function (d) {
                        return d.value.toLocaleString()
                    }
                case 'currency_average':
                    return function (d) {

                        var tipStr = partyMembers[d.key]

                        if (partyMembers[d.key] == 1) {
                            tipStr += ' MP'
                        } else {
                            tipStr += ' MPs'
                        }

                        tipStr += '<br />&pound;' + Math.round(d.value).toLocaleString()
                        return tipStr
                    }
                case 'numeric_average':
                    return function (d) {

                        var tipStr = partyMembers[d.key]

                        if (partyMembers[d.key] == 1) {
                            tipStr += ' MP'
                        } else {
                            tipStr += ' MPs'
                        }

                        tipStr += '<br />' + Math.round(d.value).toLocaleString()
                        return tipStr
                    }

            }

        }
    });
});