import DS from 'ember-data';

export default DS.Model.extend({
	created_at: DS.attr(),
	book: DS.belongsTo('book', {async: false}),
	student: DS.belongsTo('student')
});
