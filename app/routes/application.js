import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		invalidateSession() {
			this.get('auth').invalidate();
		}
	}
});