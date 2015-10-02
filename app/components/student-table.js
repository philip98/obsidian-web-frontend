import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'table',
	classNames: ['table-header-rotated'],
	studentsExtended: Ember.computed('students', 'students.@each.baseSets', 'books', function() {
		return this.get('students').map((student) => {
			return {
				student: student,
				baseSets: this.get('books').map((book) => {
					return student.get('baseSets').filterBy('book.id', book.get('id')).length === 1;
				})
			};
		});
	})
});