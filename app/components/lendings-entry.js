import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	date: Ember.computed('lending.createdAt', () => {
		return (new Date(this.get('lending.createdAt'))).toLocaleString();
	})
});