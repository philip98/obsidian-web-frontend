import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.name = '';
	}, actions: {
		create() {
			if (this.get('name')) {
				let r = this.store.createRecord('teacher', {
					name: this.get('name')
				});
				return r.save().then(() => {
					this.set('name', '');
					this.get('flashMessages').success('Lehrer erfolgreich erstellt');
					return this.transitionToRoute('teachers.index');
				}, (reason) => {
					this.get('flashMessages').alert(reason);
				});
			}
		}
	}
});
