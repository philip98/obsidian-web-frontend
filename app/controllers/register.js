import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.name = '';
		this.password = '';
	},
	valid: Ember.computed.and('name', 'password'),
	actions: {
		register() {
			let a = this.store.createRecord('school', {
				password: this.get('password'),
				name: this.get('name')
			});
			a.save().then(() => {
				return this.get('auth').authenticate(this.get('name'), this.get('password'));
			}, (reason) => {
				this.get('flashMessages').danger(reason);
			}).then(() => {
				this.set('password', '');
				this.set('name', '');
				this.set('invalidSchool', false);
				this.get('flashMessages').success('Schule erfolgreich erstellt');
				this.transitionTo('index');
			}, (reason) => {
				this.set('password', '');
				this.set('name', '');
				this.get('flashMessages').danger(reason);
			});
		}
	}
});