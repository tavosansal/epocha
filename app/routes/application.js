import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  electron: service(),

  redirect() {
    if (this.get('electron.isElectron')) {
      this.transitionTo('single');
    }
  },

  actions: {
    openMenu() {
      if (this.get('electron.isElectron')) {
        this.electron.openContextMenu();
      }
    },
  },
});
