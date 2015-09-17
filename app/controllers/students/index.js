import Ember from 'ember';

export default Ember.Controller.extend({
	query: '',
	filteredData: Ember.computed('model', 'query', function() {
		if (this.get('query')) {
			return this.get('model').filter((item) => {
				return item.get('name').toLowerCase().indexOf(this.get('query')) > -1;
			});
		} else {
			return this.get('model');
		}
	})
});