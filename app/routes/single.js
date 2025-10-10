import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  store: service('store'),
model() {
    return this.store.findAll('converter');
  },

  setupController(controller, model) {
    if (model.content.length > 0) {
      controller.set('model', model.content[0].record);
    } else {
      const emptyRecord = this.store.createRecord('converter', {
        title: '',
      });
      emptyRecord.save();

      controller.set('model', emptyRecord);
    }
  },
});
