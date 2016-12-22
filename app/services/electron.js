/* global require */

import Ember from 'ember';
import ENV from 'epocha/config/environment';

export default Ember.Service.extend({
  isElectron: false,
  contextMenu: null,

  init() {
    this._super(...arguments);
    if (ENV.isElectron) {
      this.set('isElectron', true);
      this.createContextMenu();
    }
  },

  createContextMenu() {
    const { remote } = require('electron');
    const { Menu, MenuItem } = remote;

    const menu = new Menu();
    menu.append(
      new MenuItem({
        label: 'About',
        click() {
          const shell = require('electron').shell;
          shell.openExternal('http://www.epocha.io/about');
        }
      })
    );
    menu.append(
      new MenuItem({
        label: 'Quit Epocha',
        click() {
          window.close();
        }
      })
    );
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({
      label: 'Cut',
      role: 'cut',
    }));
    menu.append(new MenuItem({
      label: 'Copy',
      role: 'copy',
    }));
    menu.append(new MenuItem({
      label: 'Paste',
      role: 'paste',
    }));

    this.set('contextMenu', menu);

    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();

      let node = e.target;

      while (node) {
        if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
          menu.popup(remote.getCurrentWindow());
          break;
        }
        node = node.parentNode;
      }
    });
  },

  openContextMenu() {
    const { remote } = require('electron');
    this.get('contextMenu').popup(remote.getCurrentWindow());
  },
});
