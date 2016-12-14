import Ember from 'ember';
import ENV from 'epocha/config/environment';

export default Ember.Service.extend({
  isElectron: false,

  init() {
    this._super(...arguments);
    if (ENV.isElectron) {
      this.set('isElectron', true);
    }
  },
});
