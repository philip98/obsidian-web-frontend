import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('teacher').catch(() => {
			if (!this.controllerFor('teachers.index').get('auth.isAuthenticated')) {
				this.get('flashMessages').warning('Sie müssen sich zuerst einloggen');
				return this.transitionTo('login');
			}
		});
	}
});