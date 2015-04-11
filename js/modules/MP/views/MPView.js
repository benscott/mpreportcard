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
            rebel_votes: "#mp-rebel-votes"
        },
        onShow: function () {

            this.interests.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['interests'],
                'value': this.model.get('total_interests'),
                'status_text': 'Registered financial interests of &pound;' + this.model.get('total_interests').toLocaleString(),
                'type': 'money'
            }));

            this.expenses.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['expenses'],
                'value': this.model.get('total_expenses'),
                'status_text': 'Claimed expenses of &pound;' + this.model.get('total_expenses').toLocaleString(),
                'type': 'money'
            }));

            this.debates.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['debates'],
                'value': this.model.get('debates'),
                'status_text': 'Spoke in ' +  this.model.get('debates') + ' debates'
            }));

            this.answers.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['answers'],
                'value': this.model.get('answers'),
                'status_text': 'Received answers to ' +  this.model.get('answers') + ' questions'
            }));

            this.votes.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['votes'],
                'value': this.model.get('votes_percentage'),
                'status_text': 'Attended ' + this.model.get('votes_attended') + ' out of '  + this.model.get('votes_possible') + ' votes',
                'type': 'percentage'
            }));

            this.replies.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['replies'],
                'value': this.model.get('replies_percentage'),
                'status_text': 'Replied to ' + this.model.get('replies') + ' out of '  + this.model.get('surveys') + ' letters',
                'type': 'percentage'
            }));
            this.rebel_votes.show(new App.MP.BarChartView({
                'average': App.module('Data').averages['rebel_votes'],
                'value': this.model.get('rebel_votes'),
                'status_text': 'Voted against their party in ' + this.model.get('rebel_votes') + ' votes'
            }));

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