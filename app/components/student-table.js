import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
	tagName: 'table',
	classNames: ['table-header-rotated'],
	studentsExtended: Ember.computed('students', 'students.@each.baseSets.@each.book.id', 'books', function() {
		let promise = Ember.RSVP.all(this.get('students').map((student) => {
			return student.get('baseSets').then((baseSets) => {
				return Ember.RSVP.all(baseSets.map((bs) => {
					return bs.get('book');
				}));
			}).then((bsBooks) => {
				let ids = bsBooks.map((bb) => {
					return Number(bb.get('id'));
				});
				return {
					student: student,
					baseSets: this.get('books').map((book) => {
						return ids.indexOf(Number(book.get('id'))) > -1;
					})
				};
			});
		}));
		return DS.PromiseObject.create({
			promise: promise
		});
	})
});
