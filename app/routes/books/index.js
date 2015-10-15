import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('book').catch(() => {
			if (!this.get('auth.isAuthenticated')) {
				this.get('flashMessages').warning('Sie müssen sich zuerst einloggen');
				return this.transitionTo('login');
			}
		});
	}
});
