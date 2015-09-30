import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.query = '';
	}, searchedData: Ember.computed('model', 'query', function() {
		if (this.get('query')) {
			return this.get('model').filter((item) => {
				return item.get('name').toLowerCase().indexOf(this.get('query').toLowerCase()) > -1;
			});
		} else {
			return this.get('model');
		}
	}), actions: {
		reload() {
			this.get('model').update();
		}
	}
});