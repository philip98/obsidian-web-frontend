import AbstractList from 'obsidian-web/components/abstract-list';

export default AbstractList.extend({
    actions: {
        sortTitle: function() {
            this.sendAction('action', 'title');
        }, sortTitleDesc: function() {
            this.sendAction('action', '-title');
        }, sortForm: function() {
            this.sendAction('action', 'form');
        }, sortFormDesc: function() {
            this.sendAction('action', '-form');
        }
    }
});
