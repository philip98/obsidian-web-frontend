import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'table',
	data: {},
	checkAll: false,
	checkAllObserver: Ember.observer('checkAll', function() {
		this.get('data').forEach((st) => {
			st.set('checked', this.get('checkAll'));
		});
	}),
	actions: {
		sortName() {
			this.sendAction('action', 'name');
		}, sortNameDesc() {
			this.sendAction('action', '-name');
		}, sortKlass() {
			this.sendAction('action', 'klass');
		}, sortKlassDesc() {
			this.sendAction('action', '-klass');
		}
	}
});
