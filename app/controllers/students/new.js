import Ember from 'ember';

export default Ember.Controller.extend({
	name: '',
	gradYear: '',
	classLetter: '',
	gradYearValid: Ember.computed.gte('gradYear', 2000),
	classLetterValid: Ember.computed('classLetter', function() {
		return this.get('classLetter').length <= 1;
	}),
	valid: Ember.computed.and('classLetterValid', 'gradYearValid'),
	actions: {
		create() {
			if (this.get('gradYearValid') && this.get('classLetterValid') && this.get('name')) {
				let r = this.store.createRecord('student', {
					name: this.get('name'),
					graduationYear: Number(this.get('gradYear')),
					classLetter: this.get('classLetter')
				});
				return r.save().then(() => {
					this.set('name', '');
					this.set('gradYear', '');
					this.set('classLetter', '');
					this.set('errorMessage', '');
					return this.transitionToRoute('students.index');
				}, (reason) => {
					this.set('errorMessage', String(reason));
				});
			}
		}
	}
});