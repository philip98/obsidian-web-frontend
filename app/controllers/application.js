import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		invalidateSession() {
			this.get('auth').invalidate().then(() => {
				this.transitionToRoute('index');
			}, () => {
				throw new Error('Konnte nicht ausgeloggt werden');
			});
		}
	}
});