import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('book', params.id, {include: ['aliases']}).catch(() => {
			if (!this.controllerFor('books.show').get('auth').isAuthenticated) {
				return this.transitionTo('login');
			}
		});
	}
});