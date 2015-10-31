import Ember from 'ember';

export default Ember.Component.extend({
    init() {
        this.klass = null;
        this.dataReveal = true;
        this.files = null;
        this.header = 'name';
        this._super(...arguments);
    },
    classNames: ['reveal-modal', 'small'],
    attributeBindings: ['id', 'dataReveal:data-reveal'],
    filesSelected: Ember.computed.and('files', 'header'),
    actions: {
        submit() {

        },
        changeFile(files) {
            let a = Ember.A();
            for (let i = 0; i < files.length; ++i) {
                a.pushObject(files.item(i));
            }
            this.set('files', a);
        }
    }
});
