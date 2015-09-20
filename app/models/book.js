import DS from 'ember-data';

export default DS.Model.extend({
	isbn: DS.attr(),
	title: DS.attr(),
	form: DS.attr(),
	aliases: DS.hasMany('alias', {async: true}),
	lendings: DS.hasMany('lending', {async: true}),
	base_sets: DS.hasMany('base-set', {async: true})
});
