import Ember from 'ember';
import Isbn from 'obsidian-web/controllers/students/lend-base';

export default Ember.Controller.extend({
	isbns: Ember.A([Isbn.create(), Isbn.create()]),
	actions: {
		load(isbn) {
			let text = isbn.get('text');
			if (text) {
				this.store.queryRecord('alias', {filter: {name: text}, include: 'book'}).then((alias) => {
					if (alias.get('length') === 0) {
						this.store.queryRecord('book', {filter: {isbn: text}}).then((book) => {
							if (book.get('length') === 0) {
								isbn.set('error', true);
							} else {
								isbn.set('error', false);
								isbn.set('book', book.get('0'));
							}
						});
					} else {
						isbn.set('error', false);
						isbn.set('book', alias.get('0.book'));
					}
					this.get('isbns').pushObject(Isbn.create());
				});
			}
		}, save() {
			let errors = Ember.A([]);
			this.get('isbns').forEach((isbn) => {
				if (isbn.get('book')) {
					this.store.queryRecord('baseSet', {
						filter: {
							student_id: this.get('model.id'),
							book_id: isbn.get('book.id')
						}
					}).then((baseSet) => {
						if (baseSet.get('length') > 0) {
							baseSet.get('0').destroyRecord().catch((reason) => {
								errors.pushObject(reason);
							});
						} else if (baseSet.get('length') === 0) {
							errors.pushObject(isbn.get('book.title') + ' war gar nicht ausgeliehen');
						}
					}).catch((reason) => {
						errors.pushObject(reason);
					});
				}
			});
			if (errors.get('length') === 0) {
				this.get('isbns').clear();
				this.get('isbns').pushObjects([Isbn.create(), Isbn.create()]);
				this.transitionToRoute('students.index', {
					queryParams: {
						klass: this.get('model.klass'),
						view: 'list'
					}
				});
			} else {
				this.set('errors', errors);
			}
		}
	}
});