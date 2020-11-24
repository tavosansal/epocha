import Route from '@ember/routing/route';

export default Route.extend({
  helpCollapsed: true,

  model() {
    return this.store.findAll('converter');
  },

  afterModel(model) {
    if (!model.content.length) {
      this.newEmptyConverter();
    }
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('helpCollapsed', this.helpCollapsed);
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
    },

    toggleHelp() {
      this.controller.toggleProperty('helpCollapsed');
    },
  },
});
