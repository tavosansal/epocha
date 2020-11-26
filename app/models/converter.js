import Model, { attr } from '@ember-data/model';

export default Model.extend({
  label: attr('string'),
  timestamp: attr('number'),
  timezone: attr('string'),
});
