import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('student').catch(() => {
			if (!this.controllerFor('students.index').get('auth').isAuthenticated()) {
				return this.transitionTo('login');
			}
		});
	}
});