import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['col-md-4'],
  isNotPaused: true,
  currentTime: Ember.inject.service(),
  currentTimestamp: Ember.computed.alias('currentTime.currentTime'),
  timezones: Ember.computed.alias('currentTime.timezones'),
  isPaused: Ember.computed.not('isNotPaused'),
  
  init() {
    this._super(...arguments);

    this.set('currentTimezone', this.get('currentTime.currentTimezone'));
  },

  currentTimeDisplay: Ember.computed('currentTimestamp', 'pausedTime', 'isPaused', function() {
    if (this.get('isPaused')) {
      return this.get('pausedTime');
    }
    return this.get('currentTimestamp');
  }),

  humanDate: Ember.computed('currentTimestamp', 'pausedTime', 'isPaused', function() {
    let timestampToConvert;
    if (this.get('isPaused')) {
      timestampToConvert = this.get('pausedTime');
    } else {
      timestampToConvert = this.get('currentTimestamp'); 
    }
    return moment.unix(timestampToConvert).tz(this.get('currentTimezone.name'));
  }),

  humanDateUtc: Ember.computed('currentTimestamp', 'pausedTime', 'isPaused', function() {
    let timestampToConvert;
    if (this.get('isPaused')) {
      timestampToConvert = this.get('pausedTime');
    } else {
      timestampToConvert = this.get('currentTimestamp');
    }
    return moment.unix(timestampToConvert).utc();
  }),

  actions: {
    pause() {
      let pausedTime = this.get('pausedTime') || this.get('currentTimestamp');
      this.set('pausedTime', pausedTime);
      this.set('isNotPaused', false);    
    },
    play() {
      this.set('isNotPaused', true);
      this.set('pausedTime', null); 
    },
    timezoneChanged(timezone) {
      this.set('currentTimezone', timezone);
    },
    convertTimestamp(value) {
      this.set('isNotPaused', false);
      this.set('pausedTime', value);
    },
    saveLabel(label) {
      const model = this.get('model');
      model.set('label', label);
      model.save();  
    },
  }
});
