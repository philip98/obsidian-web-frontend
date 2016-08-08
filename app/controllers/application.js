import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		invalidateSession() {
			this.get('auth').invalidate().then(() => {
				this.transitionToRoute('index');
			}, (reason) => {
				this.get('flashMessages').alert(reason);
			});
		}
	}
});
