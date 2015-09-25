import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		save() {
			if (this.get('name')) {
				let r = this.store.createRecord('alias', {
					book: this.get('model'),
					name: this.get('name')
				});
				r.save().then(() => {
					$('#addAlias').foundation('reveal', 'close');
					this.get('model.aliases').reload();
				}).catch((reason) => {
					this.get('flashMessages').danger(reason);
				})
			}
		},
		reload() {
			this.get('model.aliases').reload();
		}
	}
});