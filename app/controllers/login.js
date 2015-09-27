import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.name = '';
		this.password = '';
		this.invalidPassword = false;
	},
	valid: Ember.computed.and('name', 'password'),
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