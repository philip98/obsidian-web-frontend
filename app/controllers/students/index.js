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
		exportL() {
			$('#exportLendings').foundation('reveal', 'open');
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
		exportLendings(eLendings) {
			Ember.RSVP.all(this.get('sortedData').map((student) => {
				return student.get('baseSets').then((baseSets) => {
					return baseSets.map((baseSet) => {
						return baseSet.get('book').then((book) => {
							if (!book.get('form').includes(String((new Date()).getFullYear() +
							13 - student.get('graduationYear')))) {
								return '\t' + book.get('title') + '\n';
							} else {
								return '';
							}
						});
					});
				}).then((bsLines) => {
					return Ember.RSVP.all(bsLines).then((lines) => {
						return lines.join('');
					});
				}).then((bsString) => {
					if (eLendings) {
						return student.get('lendings').then((lendings) => {
							return lendings.map((lending) => {
								return lending.get('book').then((book) => {
									return '\t(E) ' + book.get('title') + '\n';
								});
							});
						}).then((lLines) => {
							return Ember.RSVP.all(lLines).then((lines) => {
								return lines.join('');
							});
						}).then((lString) => {
							lString = bsString + lString;
							if (lString.length > 0) {
								lString = student.get('name') + ':\n' + lString;
							}
							return lString;
						});
					} else {
						if (bsString.length > 0) {
							return student.get('name') + ':\n' + bsString;
						} else {
							return bsString;
						}
					}
				});
			})).then((lines) => {
				let text = lines.join('');
				this.get('fileSaver').save(text, 'text/plain', this.get('klass') + '.txt');
			});
		}
	}
});
