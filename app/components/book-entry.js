import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(arguments);
		this.isEditing = false;
	},
	tagName: 'tr',
	isbnValid: Ember.computed.match('book.isbn', /^\d{13}$/),
	formValid: Ember.computed.match('book.form', /^(\d+\s*)+$/),
	valid: Ember.computed.and('isbnValid', 'formValid'),
	actions: {
		destroy() {
			window.alert('Sicher?');
			this.get('book').destroyRecord().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
		},
		edit() {
			this.set('isEditing', true);
		},
		saveChanges() {
			this.get('book').save().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});