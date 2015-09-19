import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	isEditing: false,
	actions: {
		destroy() {
			window.alert("Sicher?");
			this.get('student').destroyRecord();
		},
		edit() {
			this.set('isEditing', true);
		},
		saveChanges() {
			this.get('student').save();
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});
