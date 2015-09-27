import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.query = '';
		this.editClass = '';

	},
	queryParams: ['klass'],
	klass: '',
	filteredData: Ember.computed('model', 'klass', function() {
		if (this.get('klass')) {
			return this.get('model').filterBy('klass', this.get('klass'));
		} else {
			return this.get('model');
		}
	}),
	searchedData: Ember.computed('filteredData', 'query', function() {
		if (this.get('query')) {
			return this.get('filteredData').filter((item) => {
				return item.get('name').toLowerCase().indexOf(this.get('query').toLowerCase()) > -1;
			});
		} else {
			return this.get('filteredData');
		}
	}),
	checkedStudents: Ember.computed.filterBy('searchedData', 'checked', true),
	klassesNonDistinct: Ember.computed.mapBy('model', 'klass'),
	klasses: Ember.computed.uniq('klassesNonDistinct'),
	actions: {
		massEdit() {
			this.get('checkedStudents').forEach((st) => {
				st.set('klass', this.get('editClass'));
				st.set('checked', false);
				st.save().catch((reason) => {
					this.get('flashMessages').danger(reason);
				});
			});
			this.get('model').update();
		},
		reload() {
			this.get('model').update();
		},
		changeClass(value) {
			this.set('klass', value);
		}
	}
});