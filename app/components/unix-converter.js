import Ember from 'ember';
import moment from 'moment';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  classNames: ['col-md-4'],
  isNotPaused: true,
  currentTime: Ember.inject.service(),
  currentTimestamp: Ember.computed.alias('currentTime.currentTime'),
  timezones: Ember.computed.alias('currentTime.timezones'),

  currentTimeDisplay: Ember.computed('currentTimestamp', 'pausedTime', function() {
    return this.get('pausedTime') || this.get('currentTimestamp');
  }),

  init() {
    this._super(...arguments);

    this.set('currentTimezone', this.get('currentTime.currentTimezone'));
  },

  humanDate: Ember.computed('currentTimestamp', 'pausedTime', function() {
    let timestampToConvert = this.get('pausedTime') || this.get('currentTimestamp');
    return moment.unix(timestampToConvert).tz(this.get('currentTimezone.name'));
  }),

  humanDateUtc: Ember.computed('currentTimestamp', 'pausedTime', function() {
    let timestampToConvert = this.get('pausedTime') || this.get('currentTimestamp');
    return moment.unix(timestampToConvert).utc();
  }),

  actions: {
    pause: function() {
      let pausedTime = this.get('currentTimestamp');
      this.set('pausedTime', pausedTime);
      this.set('isNotPaused', false);    
    },
    play: function() {
      this.set('isNotPaused', true);
      this.set('pausedTime', null); 
    },
    timezoneChanged: function(timezone) {
      this.set('currentTimezone', timezone);
    }
  }
});
