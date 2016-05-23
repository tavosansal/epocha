import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('converter');
  },
  
  afterModel(model) {
    if (!model.content.length) {
      this.newEmptyConverter();
    }
  },
  
  newEmptyConverter() {
    const emptyRecord = this.store.createRecord('converter', {
        title: '',
      });
      emptyRecord.save();
  },

  actions: {
    addConverter() {
      this.newEmptyConverter();
    }
  }
});
