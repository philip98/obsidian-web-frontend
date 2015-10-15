import LendingsController from 'obsidian-web/controllers/lendings';

export default LendingsController.extend({
	processIsbn: function(isbn) {
		if (isbn.get('book')) {
			this.store.createRecord('baseSet', {
				student: this.get('model'),
				book: isbn.get('book')
			}).save().catch((reason) => {
				this.get('flashMessages').warning(reason);
			});
		}
	}, redirect() {
		this.transitionToRoute('students.index', {
			queryParams: {
				klass: this.get('model.klass'),
				style: 'list'
			}
		});
	}
});
