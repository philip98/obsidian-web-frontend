import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		style: {
			refreshModel: true
		}
	}, model() {
		return Ember.RSVP.hash({
			students: this.store.findAll('student', {include: 'baseSets'}).catch(() => {
				if (!this.get('auth.isAuthenticated')) {
					this.get('flashMessages').warning('Sie müssen sich zuerst einloggen');
					return this.transitionTo('login');
				}
			}), books: this.store.findAll('book')
		});
	}, actions: {
		activate() {
			this.refresh();
		}
	}
});
