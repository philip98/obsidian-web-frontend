import Ember from 'ember';

export default Ember.Controller.extend({
	name: '',
	password: '',
	invalidSchool: false,
	actions: {
		register() {
			let a = this.store.createRecord('school', {
				password: this.get('password'),
				name: this.get('name')
			});
			a.save().then(() => {
				return this.get('auth').authenticate(this.get('name'), this.get('password'));
			}, (reason) => {
				this.set('invalidSchool', true);
				throw new Error(String(reason));
			}).then(() => {
				this.set('password', '');
				this.set('name', '');
				this.set('invalidSchool', false);
				this.transitionTo('index');
			}, () => {
				this.set('password', '');
				this.set('name', '');
				this.set('invalidSchool', true);
			});
		}
	}
});