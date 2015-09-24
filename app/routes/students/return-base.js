import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('student', params.id).catch(() => {
			if (!this.controllerFor('students.return-base').get('auth').isAuthenticated) {
				return this.transitionTo('login');
			}
		});
	}
});