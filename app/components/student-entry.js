import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		this.isEditing = false;
	},
	tagName: 'tr',
	classNameBindings: ['free', 'partiallyFree:partially-free:'],
	free: Ember.computed.alias('student.isFree'),
	partiallyFree: Ember.computed.alias('student.isPartiallyFree'),
	actions: {
		destroy() {
			window.alert("Sicher?");
			this.get('student').destroyRecord().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
		},
		edit() {
			this.set('isEditing', true);
		},
		saveChanges() {
			this.get('student').save().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});
