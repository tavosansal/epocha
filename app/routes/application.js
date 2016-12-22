import Ember from 'ember';

export default Ember.Route.extend({
  electron: Ember.inject.service(),

  redirect() {
    if (this.get('electron.isElectron')) {
      this.transitionTo('single');
    }
  },

  actions: {
    openMenu() {
      if (this.get('electron.isElectron')) {
        this.get('electron').openContextMenu();
      }
    },
  },
});
