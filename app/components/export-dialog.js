import Ember from 'ember';

export default Ember.Component.extend({
    init() {
        this._super(...arguments);
        this.eLendings = false;
        this.dataReveal = true;
    },
    classNames: ['reveal-modal', 'small'],
    attributeBindings: ['id', 'dataReveal:data-reveal'],
    actions: {
        submit() {
            this.sendAction('action', this.get('eLendings'));
            $('#' + this.get('id')).foundation('reveal', 'close');
        }
    }
});
