import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	isEditing: false,
	isbnValid: Ember.computed.match('book.isbn', /^\d{13}$/),
	formValid: Ember.computed.match('book.form', /^(\d+\s*)+$/),
	valid: Ember.computed.and('isbnValid', 'formValid'),
	actions: {
		destroy() {
			window.alert('Sicher?');
			this.get('book').destroyRecord();
		},
		edit() {
			this.set('isEditing', true);
		},
		saveChanges() {
			this.get('book').save();
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});