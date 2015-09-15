import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	isEditing: false,
	actions: {
		destroy() {
			window.alert("Sicher?");
			this.get('student').destroyRecord();
		},
		edit() {
			this.set('isEditing', true);
			this.set('klass', this.get('student.student_class'));
		},
		saveChanges() {
			let [,gr,cl] = this.get('klass').split(/(\d+)/),
				now = new Date();
			this.set('student.class_letter', cl);
			if (now.getMonth() >= 8) {
				this.set('student.graduation_year', now.getFullYear() + 13 - Number(gr));
			} else {
				this.set('student.graduation_year', now.getFullYear() + 12 - Number(gr));
			}
			this.get('student').push();
//			this.get('student').save();
			this.set('isEditing', false);
		}
	}
});
