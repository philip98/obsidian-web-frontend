import Ember from 'ember';

export default Ember.Controller.extend({
	title: '',
	isbn: '',
	form: '',
	isbnValid: Ember.computed('isbn', function() {
		return this.get('isbn').match(/^\d{13}$/);
	}),
	formValid: Ember.computed('form', function() {
		return this.get('form').match(/^(\d+\s*)+$/);
	}),
	actions: {
		create() {
			let r = this.store.createRecord('book', {
				title: this.get('title'),
				isbn: this.get('isbn'),
				form: this.get('form')
			});
			return r.save().then(() => {
				this.set('title', '');
				this.set('isbn', '');
				this.set('form', '');
				this.set('errorMessage', '');
				return this.transitionToRoute('books.index');
			}, (reason) => {
				this.set('errorMessage', String(reason));
			});
		}
	}
});