import { moduleForModel, test } from 'ember-qunit';

moduleForModel('book', 'Unit | Model | book', {
  // Specify the other units that are required for this test.
  needs: ['model:alias', 'model:lending', 'model:baseSet']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
