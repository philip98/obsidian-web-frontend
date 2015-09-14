import { moduleForModel, test } from 'ember-qunit';

moduleForModel('base-set', 'Unit | Model | base set', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
