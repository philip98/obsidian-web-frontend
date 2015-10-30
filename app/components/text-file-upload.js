import Ember from 'ember';

export default Ember.TextField.extend({
    type: 'file',
    attributeBindings: ['multiple', 'files']
});
