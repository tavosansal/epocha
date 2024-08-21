import { computed } from '@ember/object';
import { alias, not, gt } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import moment from 'moment-timezone';

export default Component.extend({
  electron: service(),

  classNames: ['col-md-4', 'unix-converter'],
  isNotPaused: true,
  currentTime: service(),
  currentTimestamp: alias('currentTime.currentTime'),
  timezones: alias('currentTime.timezones'),
  isPaused: not('isNotPaused'),
  isNotLastIndex: gt('index', 0),

  init() {
    this._super(...arguments);

    if (this.model.timestamp) {
      this.set('isNotPaused', false);
      this.set('pausedTime', this.model.timestamp);
    }
    if (this.model.timezone) {
      this.set('currentTimezone', this.model.timezone);
    } else {
      this.set('currentTimezone', this.currentTime.currentTimezone);
    }
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
    const currentMoment = moment.unix(timestampToConvert).tz(this.currentTimezone);
    const datePart = currentMoment.format('YYYY-MM-DD');
    const timePart = currentMoment.format('HH:mm:ss');
    return `${datePart}T${timePart}`;
  }),

  humanDateUtc: computed('currentTimestamp', 'pausedTime', 'isPaused', function () {
    const timestampToConvert = this.isPaused ? this.pausedTime : this.currentTimestamp;
    return moment.unix(timestampToConvert).utc();
  }),

  isoString: computed('currentTimestamp', 'pausedTime', 'isPaused', function () {
    const timestampToConvert = this.isPaused ? this.pausedTime : this.currentTimestamp;
    return new Date(timestampToConvert * 1000).toISOString();
  }),

  actions: {
    pause() {
      let pausedTime = this.pausedTime || this.currentTimestamp;
      this.set('pausedTime', pausedTime);
      this.model.set('timestamp', pausedTime);
      this.model.save();
      this.set('isNotPaused', false);
    },
    play() {
      this.set('isNotPaused', true);
      this.set('pausedTime', null);
      this.model.set('timestamp', null);
      this.model.save();
    },
    timezoneChanged(timezone) {
      this.set('currentTimezone', timezone);
      this.model.set('timezone', timezone);
      this.model.save();
    },
    convertTimestamp(value) {
      this.set('isNotPaused', false);
      this.set('pausedTime', value);
      this.model.set('timestamp', value);
      this.model.save();
    },
    convertDate(value) {
      const timestampFromDatePicker = moment(value, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
        .tz(this.currentTimezone)
        .unix();

      this.set('isNotPaused', false);
      this.set('pausedTime', timestampFromDatePicker);
      this.model.set('timestamp', timestampFromDatePicker);
      this.model.save();
    },
    saveLabel(label) {
      this.model.set('label', label);
      this.model.save();
    },
    removeConverter() {
      if (confirm('Are you sure you want to remove this converter?')) {
        this.model.destroyRecord();
      }
    },
  },
});
