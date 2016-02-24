import Ember from 'ember';
import _ from 'lodash/lodash';
import moment from 'moment';

export default Ember.Component.extend({
  timezoneSelected: null,

  setupTimezones: function() {
    let timeZonesList = _.map(moment.tz.names(), function(zone) {
      var group = zone.split('/');

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

    _.forEach(groupedZones, function(group, key) {
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
    }

    this.set('timezoneSelected', userTz);

    // this.get('onChange')(this.get('timezoneSelected'));

  }.on('init'),

  actions: {
    selectionChanged(selection) {
      this.set('timezoneSelected', selection);
      this.get('onChange')(selection);
    }
  }
});
