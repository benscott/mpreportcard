App.module('MP', function (MP) {
    MP.MPView = Marionette.Layout.extend({
        className: 'mp',
        template: '#mp',
        emptyTemplate: '#mp-404',
        regions: {
            interests: "#mp-interests",
            expenses: "#mp-expenses",
            debates: "#mp-debates",
            answers: "#mp-answers",
            votes: "#mp-votes",
            replies: "#mp-replies",
            rebel_votes: "#mp-rebel-votes",
            edms: "#mp-edms"
        },
        onShow: function () {

            this.interests.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['interests'],
                'value': this.model.get('interests'),
                'status_text': 'Registered financial interests of &pound;' + this.model.get('interests').toLocaleString(),
                'type': 'money'
            }));

            this.expenses.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['expenses'],
                'value': this.model.get('expenses'),
                'status_text': 'Claimed expenses of &pound;' + this.model.get('expenses').toLocaleString(),
                'type': 'money'
            }));

            this.debates.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['debates'],
                'value': this.model.get('debates'),
                'status_text': 'Has spoken ' + this.model.get('speeches') + ' times in ' +  this.model.get('debates') + ' debates'
            }));

            if (this.model.get('answers') == 0 && this.model.get('govt')){
                 this.answers.show(new App.MP.EmptyView(
                     {'reason': 'Government ministers do not ask written questions.'}
                 ))
            }else{
                this.answers.show(new App.MP.BarChartView({
                    'average': App.module('Data').averages['answers'],
                    'value': this.model.get('answers'),
                    'status_text': 'Received answers to ' +  this.model.get('answers') + ' questions'
                }));
            }


            this.votes.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['votes'],
                'value': this.model.get('votes_percentage'),
                'status_text': 'Attended ' + this.model.get('votes_attended') + ' out of '  + this.model.get('votes_possible') + ' votes',
                'type': 'percentage'
            }));

            if (this.model.get('replies_percentage') == 0 && this.model.get('data_quality_indicator') != 'good'){
                 this.replies.show(new App.MP.EmptyView(
                     {'reason': 'No information for this MP is available on WriteToThem.'}
                 ))
            }else{
                this.replies.show(new App.MP.BarChartView({
                    'average': App.module('Data').averages['replies'],
                    'value': this.model.get('replies_percentage'),
                    'status_text': 'Replied to ' + this.model.get('replies') + ' out of '  + this.model.get('surveys') + ' letters',
                    'type': 'percentage'
                }));
            }


            this.rebel_votes.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['rebel_votes'],
                'value': this.model.get('rebel_votes'),
                'status_text': 'Voted against their party in ' + this.model.get('rebel_votes') + ' votes'
            }));

            if (this.model.get('edms') == 0 && this.model.get('govt')){
                 this.edms.show(new App.MP.EmptyView(
                     {'reason': 'Government ministers do not submit Early Day Motions.'}
                 ))
            }else{
                this.edms.show(new App.MP.BarChartView({
                    'average': App.module('Data').averages['edms'],
                    'value': this.model.get('edms'),
                    'status_text': 'Submitted ' + this.model.get('edms') + ' Early Day Motions'
                }));
            }



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