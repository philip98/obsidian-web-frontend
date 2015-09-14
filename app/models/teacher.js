import DS from 'ember-data';
import Person from 'obsidian-web/models/person';

export default Person.extend({
	name: DS.attr()
});