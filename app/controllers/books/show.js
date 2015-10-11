import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.name = '';
	},
	actions: {
		save() {
			if (this.get('name')) {
				let r = this.store.createRecord('alias', {
					book: this.get('model'),
					name: this.get('name')
				});
				this.set('name', '');
				r.save().then(() => {
					Ember.$('#addAlias').foundation('reveal', 'close');
					this.get('model.aliases').reload();
				}).catch((reason) => {
					this.get('flashMessages').danger(reason);
				})
			}
		},
		reload() {
			this.get('model.aliases').reload();
		},
		add() {
			Ember.$('#addAlias').foundation('reveal', 'open');
		}
	}
});
