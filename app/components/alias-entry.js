import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		this.isEditing = false;
	},
	tagName: 'tr',
	actions: {
		destroy() {
			window.alert('Sicher?');
			this.get('alias').destroyRecord().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
		},
		edit() {
			this.set('isEditing', true);
		},
		saveChanges() {
			this.get('alias').save().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});