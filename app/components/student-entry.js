import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	classNameBindings: ['free', 'partiallyFree:partially-free:'],
	isEditing: false,
	partiallyFree: Ember.computed('student.baseSets.@each.form', function () {
		return this.get('student.baseSets').every((item) => {
			let [,form,] = this.get('student.klass').split(/(\d+)/);
			return this.get('student.baseSets').every((item) => {
				return !!item && item.get('form').indexOf(String(Number(form) + 1)) > -1;
			})
		});
	}),
	free: Ember.computed('student.baseSets', 'student.lendings', function () {
		return (this.get('student.baseSets').length === 0 && this.get('student.lendings').length === 0);
	}),
	actions: {
		destroy() {
			window.alert("Sicher?");
			this.get('student').destroyRecord();
		},
		edit() {
			this.set('isEditing', true);
		},
		saveChanges() {
			this.get('student').save();
			this.set('isEditing', false);
			this.sendAction();
		}
	}
});
