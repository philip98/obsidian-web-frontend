import DS from 'ember-data';

export default DS.Model.extend({
	book: DS.belongsTo('book', {async: false}),
	lender: DS.belongsTo('person', {polymorphic: true})
});
