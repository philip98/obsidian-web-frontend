import DS from 'ember-data';
import Person from 'obsidian-web/models/person';
import Ember from 'ember';

export default Person.extend({
	name: DS.attr(),
	graduationYear: DS.attr('number'),
	classLetter: DS.attr(),
	baseSets: DS.hasMany('baseSet'),
	klass: Ember.computed('graduationYear', 'classLetter', {
		get() {
			let now = new Date();
			if (now.getMonth() >= 8) {
				return String(now.getFullYear() + 13 - this.get('graduationYear')) + this.get('classLetter');
			} else {
				return String(now.getFullYear() + 12 - this.get('graduationYear')) + this.get('classLetter');		
			}
		}, set(key, value) {
			let [,fo,cl] = String(value).split(/(\d+)/),
				now = new Date();
			this.set('classLetter', cl);
			if (now.getMonth() >= 8) {
				this.set('graduationYear', now.getFullYear() + 13 - Number(fo));
			} else {
				this.set('graduationYear', now.getFullYear() + 12 - Number(fo));
			}
		}
	})
});