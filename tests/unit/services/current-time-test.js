import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | current time', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:current-time');
    assert.ok(service);
  });
});
