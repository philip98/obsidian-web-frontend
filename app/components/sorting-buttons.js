import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['sort-buttons'],
    showAsc: Ember.computed('sorting', 'field', function() {
        return this.get('sorting') !== this.get('field');
    }),
    showDesc: Ember.computed('sorting', 'field', function() {
        return this.get('sorting') !== '-' + this.get('field');
    })
});
