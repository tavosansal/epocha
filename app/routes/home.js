import Ember from 'ember';

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
      label: '',
    });
    emptyRecord.save();
  },

  actions: {
    addConverter() {
      this.newEmptyConverter();
    }
  }
});
