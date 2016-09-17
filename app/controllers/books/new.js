import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.title = '';
		this.isbn = '';
		this.form = '';
	},
	isbnValid: Ember.computed.match('isbn', /^\d{13}$/),
	formValid: Ember.computed.match('form', /^(\d+\s*)+$/),
	valid: Ember.computed.and('isbnValid', 'formValid'),
	actions: {
		create() {
			if (this.get('isbnValid') && this.get('formValid')) {
				let r = this.store.createRecord('book', {
					title: this.get('title'),
					isbn: this.get('isbn'),
					form: this.get('form')
				});
				return r.save().then(() => {
					this.set('title', '');
					this.set('isbn', '');
					this.set('form', '');
					this.get('flashMessages').success('Buch erfolgreich erstellt');
					return this.transitionToRoute('books.index');
				}, (reason) => {
					this.get('flashMessages').alert(reason);
				});
			}
		}
	}
});
