import Ember from 'ember';

export default Ember.Controller.extend({
	query: '',
	klass: '',
	filteredData: Ember.computed('model', 'query', function() {
		if (this.get('query')) {
			return this.get('model').filter((item) => {
				return item.get('name').toLowerCase().indexOf(this.get('query')) > -1;
			});
		} else {
			return this.get('model');
		}
	}),
	checkedStudents: Ember.computed.filterBy('filteredData', 'checked', true),
	actions: {
		massEdit() {
			this.get('checkedStudents').forEach((st) => {
				st.set('klass', this.get('klass'));
				st.set('checked', false);
				st.save();
			});
			this.get('model').update();
		},
		reload() {
			this.get('model').update();
		}
	}
});