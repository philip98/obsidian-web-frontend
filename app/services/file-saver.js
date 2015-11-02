import Ember from 'ember';

export default Ember.Service.extend({
    save(fileContents, mimeType, fileName) {
        window.saveAs(new Blob([fileContents], {type: mimeType}), fileName);
    }
});
