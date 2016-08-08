import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		this.isEditing = false;
	},
	tagName: 'tr',
	classNameBindings: ['free', 'partiallyFree:partially-free:'],
	free: Ember.computed.alias('student.isFree'),
	partiallyFree: Ember.computed('student', 'free', function() {
		return !this.get('free') && this.get('student.isPartiallyFree');
	}),
	actions: {
		destroy() {
			window.alert("Sicher?");
			this.get('student').destroyRecord().catch((reason) => {
				this.get('flashMessages').alert(reason);
			});
		},
		edit() {
			this.set('isEditing', true);
		},
		saveChanges() {
			this.get('student').save().catch((reason) => {
				this.get('flashMessages').alert(reason);
			});
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});
