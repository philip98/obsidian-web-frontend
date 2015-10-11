import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
	},
	tagName: 'li',
	autofocus: Ember.computed.equal('index', 0),
	actions: {
		inputBlur() {
			this.sendAction('action', this.get('isbn'));
		}
	}
});
