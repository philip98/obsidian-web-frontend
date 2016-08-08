import Ember from 'ember';

function translateHeader(field) {
    switch(field.trim()) {
        case 'name':
            return 'name';
        case 'abschlussjahr':
            return 'graduationYear';
        case 'klassenbuchstabe':
            return 'classLetter';
        case 'klasse':
            return 'klass';
        default:
            return null;
    }
}

export default Ember.Component.extend({
    init() {
        this.klass = null;
        this.dataReveal = true;
        this.files = Ember.A();
        this.header = 'name';
        this._super(...arguments);
    },
    classNames: ['reveal-modal', 'small'],
    attributeBindings: ['id', 'dataReveal:data-reveal'],
    filesSelected: Ember.computed.and('files.length', 'headers.length'),
    headers: Ember.computed('header', function() {
        return Ember.A(Papa.parse(this.get('header')).data[0]).map(translateHeader);
    }),
    actions: {
        submit() {
            let _this = this;
            Papa.parse(this.get('files.firstObject'), {
                step(results, parser) {
                    if (results.data[0].length !== _this.get('headers.length')) {
                        _this.get('flashMessages').alert('Eine Zeile enthält nicht so viele Felder wie angegeben');
                        parser.abort();
                        return;
                    } else {
                        let a = {};
                        if (_this.get('klass').length > 0) {
                            a.klass = _this.get('klass');
                        }
                        for (let i = 0; i < results.data[0].length; ++i) {
                            a[_this.get('headers').objectAt(i)] = results.data[0][i].trim();
                        }
                        _this.sendAction('action', a);
                    }
                }, error(err) {
                    _this.get('flashMessages').alert(err.message);
                }, complete(results) {
                    if (!results.meta.aborted) {
                        $('#' + _this.get('id')).foundation('reveal', 'close');
                        _this.sendAction('finished');
                    } else {
                        _this.get('flashMessages').warning('Der Importiervorgang wurde abgebrochen');
                    }
                },
                skipEmptyLines: true
            });
        },
        changeFile(files) {
            this.get('files').clear();
            for (let i = 0; i < files.length; ++i) {
                this.get('files').pushObject(files.item(i));
            }
        }
    }
});
