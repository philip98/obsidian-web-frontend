import Ember from 'ember';

export let Isbn = Ember.Object.extend({
	init() {
		this._super(arguments);
		this.book = {};
		this.text = '';
		this.error = false;
	}
});

export default Ember.Controller.extend({
	init() {
		this._super(arguments);
		this.isbns = Ember.A([Isbn.create(), Isbn.create()]);
	},
	actions: {
		load(isbn) {
			let text = isbn.get('text');
			if (!text) {
				return;
			}
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
		},
		save() {
			this.get('isbns').forEach((isbn) => {
				if (!isbn.get('book')) {
					return;
				}
				this.store.createRecord('baseSet', {
					student: this.get('model'),
					book: isbn.get('book')
				}).save().catch((reason) => {
					this.get('flashMessages').danger(reason);
				});
			});
			this.get('isbns').clear();
			this.get('isbns').pushObjects([Isbn.create(), Isbn.create()]);
			this.transitionToRoute('students.index', {
				queryParams: {
					klass: this.get('model.klass'),
					view: 'list'
				}
			});
		}
	}
});