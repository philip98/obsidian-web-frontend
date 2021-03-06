import LendingsController from 'obsidian-web/controllers/lendings';

export default LendingsController.extend({
	processIsbn(isbn) {
		if (isbn.get('book')) {
			this.store.createRecord('lending', {
				person: this.get('model'),
				book: isbn.get('book')
			}).save().catch((reason) => {
				this.get('flashMessages').warning(reason);
			});
		}
	}, redirect() {
		this.transitionToRoute(this.get('model.constructor.modelName') + 's.show', this.get('model'));
	}
});
