import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.$.ajax({
            url: 'https://api.github.com/repos/philip98/obsidian-web-frontend/contents/help.md',
            dataType: 'text',
            accepts: {
                text: 'application/vnd.github.3.html'
            }
        });
    }
});
