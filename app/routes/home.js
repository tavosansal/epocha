import Ember from 'ember';

export default Ember.Route.extend({
  converters: Ember.A(),

  model() {
    if (this.get('converters').length === 0) {
      this.get('converters').pushObject(1);      
    }
    return this.get('converters');
  },

  actions: {
    addConverter() {
      let last = this.get('converters.lastObject');
      last++;

      this.get('converters').pushObject(last);
    }
  }
});
