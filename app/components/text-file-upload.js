import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'input',
    type: 'file',
    attributeBindings: ['multiple', 'type'],
    type: 'file',
    change(event) {
        this.sendAction('action', event.target.files);
    }
});
