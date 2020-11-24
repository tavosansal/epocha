import { computed } from '@ember/object';
import { alias, not, gt } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import moment from 'moment-timezone';

export default Component.extend({
  electron: service(),

  classNames: ['col-md-4'],
  isNotPaused: true,
  currentTime: service(),
  currentTimestamp: alias('currentTime.currentTime'),
  timezones: alias('currentTime.timezones'),
  isPaused: not('isNotPaused'),
  isNotLastIndex: gt('index', 0),

  init() {
    this._super(...arguments);

    this.set('currentTimezone', this.currentTime.currentTimezone);
  },

  currentTimeDisplay: computed('currentTimestamp', 'pausedTime', 'isPaused', function () {
    if (this.isPaused) {
      return this.pausedTime;
    }
    return this.currentTimestamp;
  }),

  humanDate: computed('currentTimestamp', 'pausedTime', 'isPaused', 'currentTimezone', function () {
    let timestampToConvert;
    if (this.isPaused) {
      timestampToConvert = this.pausedTime;
    } else {
      timestampToConvert = this.currentTimestamp;
    }
    return moment.unix(timestampToConvert).tz(this.currentTimezone);
  }),

  humanDateUtc: computed('currentTimestamp', 'pausedTime', 'isPaused', function () {
    let timestampToConvert;
    if (this.isPaused) {
      timestampToConvert = this.pausedTime;
    } else {
      timestampToConvert = this.currentTimestamp;
    }
    return moment.unix(timestampToConvert).utc();
  }),

  actions: {
    pause() {
      let pausedTime = this.pausedTime || this.currentTimestamp;
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
      const model = this.model;
      model.set('label', label);
      model.save();
    },
    removeConverter() {
      if (confirm('Are you sure you want to remove this item?')) {
        this.model.destroyRecord();
      }
    },
  }
});
