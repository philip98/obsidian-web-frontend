import Ember from 'ember';

export default Ember.Controller.extend({
	name: '',
	gradYear: '',
	classLetter: '',
	gradYearValid: function() {
		return Number(this.get('gradYear')) >= 2000;
	}.property('gradYear'),
	classLetterValid: function() {
		return this.get('classLetter').length <= 1;
	}.property('classLetter'),
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