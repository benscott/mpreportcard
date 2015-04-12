App.module('MP', function (MP) {
    MP.MPView = Marionette.ItemView.extend({
        className: 'mp',
        template: '#mp',
        emptyTemplate: '#mp-404',

        initialize: function () {

            var _this = this
            var status = {}

            _.each(App.module('Data').averages, function( average, key ) {

                var value = _this.model.get(key)
                var tolerance_value = average * 0.05

                if (value >= (average - tolerance_value) && value <= (average + tolerance_value)) {
                    status[key] = 'average'
                } else if (value >= (average)) {
                    status[key] = 'Above average'
                } else {
                    status[key] = 'Below average'
                }

            });

            this.model.set('status', status)

        },

        templateHelpers: function () {
            return {
                getStatus: function (key) {


                    if ((key == 'answers' || key == 'edms') && this.govt){
                        return '<div class="traffic-light na"></div>'
                    }

                    var status = this.status[key]
                    return '<div class="traffic-light ' + status.toLowerCase().replace(' ', '-') + '"><span>' + status + '</span></div>'

                },
                debates_description: function () {
                    return 'Has spoken ' + this.speeches + ' times in ' + this.debates + ' debates. The MP average was ' + App.module('Data').averages['debates'] + ' debates.'
                },
                interests_description: function () {
                    return 'Financial interests declared by ' + this.name + '. The MP average was &pound' + App.module('Data').averages['interests'].toLocaleString() + '.'
                },
                expenses_description: function () {
                    return this.name + ' declared expenses totalling &pound' + this.expenses.toLocaleString() + ' in this parliament. The MP average was &pound' + App.module('Data').averages['expenses'].toLocaleString() + '.'
                },
                answers_description: function () {
                    if (this.govt){
                        return 'Government ministers do not submit written questions.'
                    }else{
                        return 'Received answers to ' +  this.answers + ' written questions. The MP average was ' + App.module('Data').averages['answers'] + '.'
                    }
                },
                votes_description: function () {
                    return 'Attended ' + this.votes_attended + ' out of '  + this.votes_possible + ' votes.  The average attendance was ' + App.module('Data').averages['votes_percentage'] + '&percnt;.'
                },
                replies_description: function () {
                    return  'Replied to ' + this.replies + ' out of '  + this.surveys + ' letters sent via WriteToThem in 2013. The average reply rate was ' + App.module('Data').averages['replies'] + '&percnt;.'
                },
                rebel_votes_description: function () {
                    return  'Voted against their party in ' + this.rebel_votes + ' votes. The MP average was ' + App.module('Data').averages['rebel_votes'] + '.'
                },
                edms_description: function () {
                    if (this.govt) {
                       return 'Government ministers do not submit Early Day Motions.'
                    }else{
                        return  'Submitted ' + this.edms + ' Early Day Motions. The MP average was ' + App.module('Data').averages['edms'] + '.'
                    }
                }



            };
        },
        getTemplate: function () {
            if (this.model) {
                return this.template;
            }
            else {
                return this.emptyTemplate;
            }
        },
        onRender: function () {
            // Make mp page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#mp"]').parent().addClass('active');
        }
    });
});