import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	klass: '',
	classNameBindings: ['free', 'partiallyFree:partially-free:'],
	isEditing: false,
	free: Ember.computed.alias('student.isFree'),
	partiallyFree: Ember.computed.alias('student.isPartiallyFree'),
	actions: {
		destroy() {
			window.alert("Sicher?");
			this.get('student').destroyRecord();
		},
		edit() {
			this.set('isEditing', true);
			this.set('klass', this.get('student.klass'));
		},
		saveChanges() {
			this.set('student.klass', this.get('klass'));
			this.get('student').save();
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});
