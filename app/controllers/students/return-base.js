import Ember from 'ember';
import LendingsController from 'obsidian-web/controllers/lendings';

export default LendingsController.extend({
	processIsbn: function(isbn) {
		if (isbn.get('book')) {
			this.get('model.baseSets').then((baseSets) => {
				let filteredBaseSets = baseSets.filterBy('book.id', isbn.get('book.id'));
				if (filteredBaseSets.get('length') === 0) {
					this.get('flashMessages').warning(isbn.get('book.title') + ' war gar nicht ausgeliehen');
				} else {
					filteredBaseSets.get('firstObject').destroyRecord().catch((reason) => {
						this.get('flashMessages').warning(reason);
					});
				}
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