import DS from 'ember-data';

export default DS.Model.extend({
	isbn: DS.attr(),
	title: DS.attr(),
	form: DS.attr(),
	aliases: DS.hasMany('alias', {async: true}),
	lendings: DS.hasMany('lending', {async: true}),
	baseSets: DS.hasMany('baseSet', {async: true})
});
