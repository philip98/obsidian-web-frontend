import Ember from 'ember';

export default Ember.Controller.extend({
    passwordsMatch: Ember.computed.equal('password', 'confirmPassword'),
    actions: {
        submit() {
            if (this.get('passwordsMatch')) {
                this.set('model.password', this.get('password'));
                this.get('model').save().then(() => {
                    this.get('flashMessages').success('Passwort geändert');
                }, (reason) => {
                    this.get('flashMessages').danger(reason);
                });
            }
        }, delete() {
            this.get('model').destroyRecord().then(() => {
                this.get('auth').destroySession();
                this.transitionToRoute('index');
            }, (reason) => {
                this.get('flashMessages').danger(reason);
            });
        }
    }
});
