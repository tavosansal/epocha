import Ember from 'ember';

export default Ember.Route.extend({
  converters: Ember.A(),

  model() {
    this.get('converters').pushObject(1);
    return this.get('converters');
  },

  actions: {
    addConverter() {
      var last = this.get('converters.lastObject');
      last++;

      this.get('converters').pushObject(last);
    }
  }
});
