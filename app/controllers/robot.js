import Ember from 'ember';
/* global moment */

export default Ember.Controller.extend({
    setValue: function() {
        var currentTimestamp = moment().unix();
        this.set('value', currentTimestamp);
    }.on('init'),

    actions: {
        getDate: function() {
            var robotDate = this.get('value');
            var humanDate = moment.unix(robotDate);
            this.set('humanDate', humanDate);
        }
    }
});
