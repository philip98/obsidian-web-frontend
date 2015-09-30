import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		if (params.person_type === 'teacher' || params.person_type === 'student') {
			return this.store.findRecord(params.person_type, params.person_id).catch(() => {
				if (!this.controllerFor('lendings.lend').get('auth.isAuthenticated')) {
					this.get('flashMessages').warning('Sie müssen sich zuerst einloggen');
					this.transitionTo('login');
				}
			});
		} else {
			this.get('flashMessages').warning('Nicht erlaubt (:person_type muss \'student\' oder \'teacher\' sein)');
			this.transitionTo('index');
		}
	}
});