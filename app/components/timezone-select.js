import Component from '@ember/component';

export default Component.extend({
  timezoneSelected: null,

  actions: {
    selectionChanged(selection) {
      this.set('timezoneSelected', selection);
      this.onChange(selection);
    }
  }
});
