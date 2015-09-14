import DS from 'ember-data';
import Person from 'obsidian-web/models/person';

export default Person.extend({
	name: DS.attr(),
	graduation_year: DS.attr(),
	class_letter: DS.attr(),
	base_sets: DS.hasMany('base-set')
});