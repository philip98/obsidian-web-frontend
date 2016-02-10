import Ember from 'ember';
import OrderSearch from 'obsidian-web/mixins/order-search';

export default Ember.Controller.extend(OrderSearch, {
	init() {
		this._super(...arguments);
		this.searchQuery = '';
		this.searchField = 'name';
		this.sorting = 'name';
		this.editClass = '';
	},
	queryParams: ['klass', 'style', 'list'],
	klass: '',
	style: 'table',
	list: 'old',
	fileSaver: Ember.inject.service('file-saver'),
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
	data: Ember.computed('model.students', 'klass', function() {
		if (this.get('klass')) {
			return this.get('model.students').filterBy('klass', this.get('klass'));
		} else {
			return this.get('model.students');
		}
	}),
	checkedStudents: Ember.computed.filterBy('sortedData', 'checked', true),
	klassesNonDistinct: Ember.computed.mapBy('model.students', 'klass'),
	klasses: Ember.computed('model.students.@each.klass', function() {
		return this.get('model.students').sortBy('klass').mapBy('klass').uniq();
	}),
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
		},
		importStudents() {
			$('#importStudents').foundation('reveal', 'open');
		},
		saveStudent(data) {
			let st = this.store.createRecord('student', {classLetter: ''});
			for (let key in data) {
				st.set(key, data[key]);
			}
			st.save().catch((reason) => {
				this.get('flashMessages').danger(reason);
			});
		},
		exportLendings() {
			let text = '';
			this.get('filteredData').forEach((student) => {
				text += student.get('name') + ':\n';
				student.get('baseSets').forEach((baseSet) => {
					if (Number(baseSet.get('book.form')) !==
						(new Date()).getFullYear() + 13 - student.get('graduationYear')) {
						text += '\t' + baseSet.get('book.title') + '\n';
					}
				});
			});
			this.get('fileSaver').save(text, 'text/plain', this.get('klass') + '.txt');
		}
	}
});
