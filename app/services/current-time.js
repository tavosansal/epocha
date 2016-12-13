import Ember from 'ember';
import moment from 'moment';
import _ from 'lodash/lodash';

export default Ember.Service.extend({

  init() {
    this._super(...arguments);
    this.setupTimezones();
    this.updateTime();
  },

  updateTime() {
    // Update the time every second.
    const updateClock = Ember.run.later(() => {
      if (!this.get('isDestroyed') && !this.get('isDestroying')) {
        this.set('currentTime', moment().unix());
      }
      this.updateTime();
    }, 1000);
    this.set('updateClock', updateClock);
  },

  setupTimezones() {
    let timeZonesList = _.map(moment.tz.names(), (zone) => {
      let group = zone.split('/');

      if (group.length > 1) {
        group = group[0];
      } else {
        group = 'Other';
      }

      return {
        name: zone,
        group: group
      };
    });

    let groupedZones = _.groupBy(timeZonesList, 'group');

    let formattedGroups = [];

    _.forEach(groupedZones, (group, key) => {
      formattedGroups.push({
        groupName: key,
        options: group
      });
    });

    this.set('timezones', formattedGroups);

    //Find user timezone
    let userTz = moment.tz.guess();
    userTz = {
      name: userTz,
      group: userTz.split('/').length > 1 ? userTz.split('/')[0] : 'Other'
    };

    if (!this.get('isDestroyed') && !this.get('isDestroying')) {
      this.set('currentTimezone', userTz);
    }
  },

});
