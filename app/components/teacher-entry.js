import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		this.isEditing = false;
	}, tagName: 'tr',
	actions: {
		destroy() {
			window.alert('Sicher?');
			this.get('teacher').destroyRecord().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
		}, edit() {
			this.toggleProperty('isEditing');
		}, saveChanges() {
			this.get('teacher').save().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
			this.toggleProperty('isEditing');
			this.sendAction();
		}
	}
});