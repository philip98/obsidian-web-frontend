import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'option',
	attributeBindings: ['isSelected:selected:', 'value'],
	isSelected: Ember.computed.equal('currentClass', 'klass'),
	value: Ember.computed.alias('klass')
});