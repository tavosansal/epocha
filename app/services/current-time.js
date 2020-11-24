import { later } from '@ember/runloop';
import Service from '@ember/service';
import moment from 'moment-timezone';

function groupBy (xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export default Service.extend({

  init() {
    this._super(...arguments);
    this.setupTimezones();
    this.updateTime();
  },

  updateTime() {
    // Update the time every second.
    const updateClock = later(() => {
      if (!this.isDestroyed && !this.isDestroying) {
        this.set('currentTime', moment().unix());
      }
      this.updateTime();
    }, 1000);
    this.set('updateClock', updateClock);
  },

  setupTimezones() {
    let timeZonesList = moment.tz.names().map((zone) => {
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

    let groupedZones = groupBy(timeZonesList, 'group');

    let formattedGroups = [];

    // groupedZones.forEach((group, key) => {
    //   formattedGroups.push({
    //     groupName: key,
    //     options: group
    //   });
    // });

    this.set('timezones', groupedZones);

    //Find user timezone
    let userTz = moment.tz.guess();
    userTz = {
      name: userTz,
      group: userTz.split('/').length > 1 ? userTz.split('/')[0] : 'Other'
    };

    if (!this.isDestroyed && !this.isDestroying) {
      this.set('currentTimezone', userTz);
    }
  },

});
