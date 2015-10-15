import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('teacher', params.id).catch(() => {
			if (!this.get('auth.isAuthenticated')) {
				this.get('flashMessages').warning('Sie müssen sich zuerst einloggen');
				return this.transitionTo('login');
			}
		});
	}
});
