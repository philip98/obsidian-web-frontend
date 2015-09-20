import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	actions: {
		inputBlur() {
			this.sendAction('action', this.get('isbn'));
		}
	}
});