import Ember from 'ember';

export default Ember.Controller.extend({
	query: '',
	searchedData: Ember.computed('model', 'query', function() {
		if (this.get('query')) {
			return this.get('model').filter((item) => {
				return item.get('title').toLowerCase().indexOf(this.get('query').toLowerCase()) > -1;
			});
		} else {
			return this.get('model');
		}
	}),
	actions: {
		reload() {
			this.get('model').update();
		}
	}
});