import Ember from 'ember';
import LendingsController from 'obsidian-web/controllers/lendings'

export default LendingsController.extend({
	processIsbn: function(isbn) {
		if (!isbn.get('book')) {
					return;
				}
		this.store.createRecord('baseSet', {
			student: this.get('model'),
			book: isbn.get('book')
		}).save().catch((reason) => {
			this.get('flashMessages').danger(reason);
		});
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