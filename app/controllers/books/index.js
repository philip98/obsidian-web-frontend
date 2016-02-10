import Ember from 'ember';
import OrderSearch from 'obsidian-web/mixins/order-search';

export default Ember.Controller.extend(OrderSearch, {
	init() {
		this._super(...arguments);
		this.searchQuery = '';
		this.searchField = 'title';
		this.sorting = 'title';
	},
	actions: {
		reload() {
			this.get('model').update();
		}
	}
});
