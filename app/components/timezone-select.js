import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Component.extend({
  currentTime: service(),
  timezoneSelected: null,

  timezones: alias('currentTime.timezones'),

  actions: {
    selectionChanged(selection) {
      this.set('timezoneSelected', selection);
      this.onChange(selection);
    },
  },
});
