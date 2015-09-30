import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('student', params.id).catch(() => {
			if (!this.controllerFor('students.show').get('auth.isAuthenticated')) {
				this.get('flashMessages').warning('Sie müssen sich zuerst einloggen');
				return this.transitionTo('login');
			}
		});
	}
});