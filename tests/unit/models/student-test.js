import { moduleForModel, test } from 'ember-qunit';

moduleForModel('student', 'Unit | Model | student', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('klass is calculated correctly', function(assert) {
    let st = this.subject({name: 'abc', graduationYear: 2018, classLetter: 'c'}),
        now = new Date();
    if (now.getMonth() >= 8) {
        assert.equal(st.get('klass'), String(now.getFullYear() - 2018 + 13) + 'c');
    } else {
        assert.equal(st.get('klass'), String(now.getFullYear() - 2018 + 12) + 'c');
    }
});
