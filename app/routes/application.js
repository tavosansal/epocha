import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  router: service('router'),
  electron: service(),

  redirect() {
    if (this.get('electron.isElectron')) {
      this.router.transitionTo('single');
    } else {
      // Redirect to home route when not in Electron mode
      this.router.transitionTo('home');
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
