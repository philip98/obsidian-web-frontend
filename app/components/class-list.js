import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'select',
	classNames: ['class-list', 'radius'],
	change() {
		this.sendAction('action', this.$(':selected').attr('value'));
	}
});