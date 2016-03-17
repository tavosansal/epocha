import Ember from 'ember';

export default Ember.Component.extend({
  timezoneSelected: null,

  actions: {
    selectionChanged(selection) {
      this.set('timezoneSelected', selection);
      this.get('onChange')(selection);
    }
  }
});
