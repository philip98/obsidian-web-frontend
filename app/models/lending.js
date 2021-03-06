import DS from 'ember-data';

export default DS.Model.extend({
	createdAt: DS.attr(),
	book: DS.belongsTo('book'),
	person: DS.belongsTo('person', {polymorphic: true})
});
