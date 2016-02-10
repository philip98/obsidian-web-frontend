import AbstractList from 'obsidian-web/components/abstract-list';

export default AbstractList.extend({
    actions: {
        sortName() {
            this.sendAction('action', 'name');
        }, sortNameDesc() {
            this.sendAction('action', '-name');
        }
    }
});
