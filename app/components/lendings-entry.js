import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	date: Ember.computed('lending.createdAt', function() {
		return (new Date(this.get('lending.createdAt'))).toLocaleString();
	})
});