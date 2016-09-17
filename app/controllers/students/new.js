import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.name = '';
		this.klass = '';
	},
	klassValid: Ember.computed.match('klass', /[0-9][0-9]?[a-z]?/i),
	actions: {
		create() {
			if (this.get('klassValid') && this.get('name')) {
				let r = this.store.createRecord('student', {
					name: this.get('name'),
					klass: this.get('klass')
				});
				return r.save().then(() => {
					this.set('name', '');
					this.set('klass', '');
					this.set('errorMessage', '');
					this.get('flashMessages').success('Schüler erfolgreich erstellt');
					return this.transitionToRoute('students.index');
				}, (reason) => {
					this.get('flashMessages').alert(reason);
				});
			}
		}
	}
});
