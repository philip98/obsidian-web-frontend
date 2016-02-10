import Ember from 'ember';
import OrderSearch from 'obsidian-web/mixins/order-search';

export default Ember.Controller.extend(OrderSearch, {
	init() {
		this._super(...arguments);
		this.searchQuery = '';
		this.searchField = 'name';
		this.sorting = 'name';
	}, data: Ember.computed.reads('model'),
	actions: {
		reload() {
			this.get('model').update();
		}
	}
});
