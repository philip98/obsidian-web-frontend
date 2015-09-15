import DS from 'ember-data';
import Person from 'obsidian-web/models/person';

export default Person.extend({
	name: DS.attr(),
	graduation_year: DS.attr('number'),
	class_letter: DS.attr(),
	base_sets: DS.hasMany('base-set'),
	student_class: Ember.computed('graduation_year', 'class_letter', {
		get() {
			let now = new Date();
			if (now.getMonth() >= 8) {
				return String(now.getFullYear() + 13 - this.get('graduation_year')) + this.get('class_letter');
			} else {
				return String(now.getFullYear() + 12 - this.get('graduation_year')) + this.get('class_letter');		
			}
		}
	})
});