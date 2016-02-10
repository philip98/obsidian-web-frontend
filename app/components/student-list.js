import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'table',
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
