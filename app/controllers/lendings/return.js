import Ember from 'ember';
import LendingsController from 'obsidian-web/controllers/lendings';

export default LendingsController.extend({
	processIsbn(isbn) {
		if (isbn.get('book')) {
			this.get('model.lendings').then((lendings) => {
				let filtered = lendings.filterBy('book.id', isbn.get('book.id'));
				if (filtered.get('length') === 0) {
					this.get('flashMessages').warning(isbn.get('book.title') + ' war gar nicht ausgeliehen');
				} else {
					filtered.get('firstObject').destroyRecord().catch((reason) => {
						this.get('flashMessages').warning(reason);
					});
				}
			});
		}
	}, redirect() {
		this.transitionToRoute(this.get('model.constructor.modelName') + 's.show', this.get('model'));
	}
});
