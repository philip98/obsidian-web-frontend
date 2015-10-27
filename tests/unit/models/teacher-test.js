import { moduleForModel, test } from 'ember-qunit';

moduleForModel('teacher', 'Unit | Model | teacher', {
  // Specify the other units that are required for this test.
  needs: ['model:lending']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
