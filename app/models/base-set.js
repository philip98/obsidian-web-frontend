import DS from 'ember-data';

export default DS.Model.extend({
	createdAt: DS.attr(),
	book: DS.belongsTo('book', {async: true}),
	student: DS.belongsTo('student')
});
