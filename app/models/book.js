import DS from 'ember-data';

export default DS.Model.extend({
	isbn: DS.attr(),
	title: DS.attr(),
	form: DS.attr(),
	aliases: DS.hasMany('alias'),
	lendings: DS.hasMany('lending'),
	base_sets: DS.hasMany('base-set')
});
