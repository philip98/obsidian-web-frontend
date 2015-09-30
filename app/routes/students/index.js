import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('student').catch(() => {
			if (!this.controllerFor('students.index').get('auth.isAuthenticated')) {
				this.get('flashMessages').warning('Sie müssen sich zuerst einloggen');
				return this.transitionTo('login');
			}
		});
	}
});