import Ember from 'ember';
import moment from 'moment';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  classNames: ['col-md-4'],
  isNotPaused: true,
  currentTime: Ember.inject.service(),
  currentTimestamp: Ember.computed.alias('currentTime.currentTime'),
  timezones: Ember.computed.alias('currentTime.timezones'),

  init() {
    this._super(...arguments);

    this.set('currentTimezone', this.get('currentTime.currentTimezone'));
  },

  humanDate: Ember.computed('currentTimestamp', function() {
    return moment.unix(this.get('currentTimestamp')).tz(this.get('currentTimezone.name'));
  }),

  humanDateUtc: Ember.computed('currentTimestamp', function() {
    return moment.unix(this.get('currentTimestamp')).utc();
  }),

  actions: {
    pause: function() {
      Ember.run.cancel(this.get('updateClock'));
      this.set('isNotPaused', false);
    },
    play: function() {
      this.set('isNotPaused', true);
      this.updateTime();
    },
    timezoneChanged: function(timezone) {
      this.set('currentTimezone', timezone);
    }
  }
});
