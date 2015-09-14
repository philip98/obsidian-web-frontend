import DS from 'ember-data';

export default DS.Model.extend({
	book: DS.belongsTo('book'),
	lender: DS.belongsTo('person', {polymorphic: true})
});
