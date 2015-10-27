import { moduleForModel, test } from 'ember-qunit';

moduleForModel('baseSet', 'Unit | Model | baseSet', {
  // Specify the other units that are required for this test.
  needs: ['model:book', 'model:student']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
