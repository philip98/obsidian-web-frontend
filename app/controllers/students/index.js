import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this._super(...arguments);
		this.query = '';
		this.editClass = '';

	},
	queryParams: ['klass', 'style', 'list'],
	klass: '',
	style: 'table',
	list: 'old',
	isTable: Ember.computed('style', 'klass', function() {
		return (this.get('klass') === '') || (this.get('style') === 'table');
	}),
	form: Ember.computed('klass', function() {
		return Number(this.get('klass').split(/^(\d+)$/)[1]);
	}),
	displayedForm: Ember.computed('form', 'list', function() {
		if ((new Date()).getMonth() < 8) {
			if (this.get('list') === 'old') {
				return String(this.get('form'));
			} else {
				return String(this.get('form') + 1);
			}
		} else {
			if (this.get('list') === 'old') {
				return String(this.get('form') - 1);
			} else {
				return String(this.get('form'));
			}
		}
	}),
	usedBooks: Ember.computed('model.books', 'displayedForm', function() {
		return this.get('model.books').filter((item) => {
			return item.get('form').indexOf(this.get('displayedForm')) > -1;
		});
	}),
	filteredData: Ember.computed('model.students', 'klass', function() {
		if (this.get('klass')) {
			return this.get('model.students').filterBy('klass', this.get('klass'));
		} else {
			return this.get('model.students');
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
	klassesNonDistinct: Ember.computed.mapBy('model.students', 'klass'),
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
			this.get('model.students').update();
		},
		reload() {
			this.get('model.students').update();
		}
	}
});
