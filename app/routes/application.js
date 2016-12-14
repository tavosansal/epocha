/* global require */

import Ember from 'ember';

export default Ember.Route.extend({
  electron: Ember.inject.service(),

  redirect() {
    if (this.get('electron.isElectron')) {
      this.transitionTo('single');
    }
  },

  openAbout() {
    if (this.get('electron.isElectron')) {
      const shell = require('electron').shell;
      shell.openExternal('http://www.epocha.io/about');
    }
  },

  actions: {
    openMenu() {
      if (this.get('electron.isElectron')) {
        const self = this;
        const { remote } = require('electron');
        const { Menu, MenuItem } = remote;

        const menu = new Menu();
        menu.append(
          new MenuItem({
            label: 'About',
            click() {
              self.openAbout();
            }
          })
        );
        menu.append(new MenuItem({type: 'separator'}));
        menu.append(
          new MenuItem({
            label: 'Quit Epocha',
            click() {
              window.close();
            }
          })
        );

        menu.popup(remote.getCurrentWindow());
      }
    },
  },
});
