import DS from 'ember-data';

export default DS.Model.extend({
	lendings: DS.hasMany('lending', {async: true})
});
