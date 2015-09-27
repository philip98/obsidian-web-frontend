import Ember from 'ember';
import LendingsController from 'obsidian-web/controllers/lendings';

export default Ember.Controller.extend({
	processIsbn: function(isbn) {
		if (isbn.get('book')) {
			this.store.queryRecord('baseSet', {
				filter: {
					student_id: this.get('model.id'),
					book_id: isbn.get('book.id')
				}
			}).then((baseSet) => {
				if (baseSet.get('length') > 0) {
					baseSet.get('0').destroyRecord().catch((reason) => {
						this.get('flashMessages').danger(reason);
					});
				} else if (baseSet.get('length') === 0) {
					this.get('flasMessages').info(isbn.get('book.title') + ' war gar nicht ausgeliehen');
				}
			}).catch((reason) => {
				this.get('flashMessages').info(reason);
			});
		}
	},
	actions: {
		redirect() {
			this.transitionToRoute('students.index', {
				queryParams: {
					klass: this.get('model.klass'),
					view: 'list'
				}
			});
		}
	}
});