import Ember from 'ember';

export default Ember.Controller.extend({
	name: '',
	password: '',
	invalidPassword: false,
	actions: {
		login() {
			this.get('auth').authenticate(this.get('name'), this.get('password')).then(() => {
				this.set('invalidPassword', false);
				this.set('name', '');
				this.set('password', '');	
				this.transitionToRoute('index');		
			}, () => {
				this.set('invalidPassword', true);
				this.set('password', '');
			});
		}
	}
});