import Ember from 'ember';
import ENV from 'epocha/config/environment';

export default Ember.Route.extend({
  redirect: function () {
    if (ENV.isElectron) {
      this.transitionTo('single');
      this.set('isElectron', true);
    } else {
      this.transitionTo('home');
    }
  }
});
