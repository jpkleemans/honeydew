var cacheVars = {};
var busy = false;
function updateAll() {
    //console.info('update all:  ' + Object.keys(cacheVars));
    for (var variableName in cacheVars) {
        cacheVars[variableName].update();
    }
    busy = false;
}
function templateContext(variable, context) {
    var prototype = {
        _key: context.t,
        key: function (newValue) {
            if (typeof newValue === 'undefined') {
                return this._key;
            }

            this._key = newValue;
        },
        _title: context.t,
        title: function (newValue) {
            if (typeof newValue === 'undefined') {
                return this._title;
            }

            this._title = newValue;
        },
        _attributes: {},
        attributes: function (newValue) {
            console.count();
            if (typeof newValue === 'undefined') {
                return this._attributes;
            }

            //
            if (variable !== undefined) {
                variable.setValue(variable.hIndex[0], 0, context, newValue.value == null ? null : parseFloat(newValue.value));
                updateAll();
            }
            //

            this._attributes = newValue;
        },
        update: function () {
            this._attributes.value = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, context);
            this._attributes.required = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 2, context);
            this._attributes.entered = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 4, context);
            this._attributes.disabled = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 3, context);

            this._attributes.style = {
                color: 'green',
                display: variable.getValue(variable.hIndex[0], 1, context) ? undefined : 'none',
                //just add some dynamics..
                width: (variable.account == 1058) ? '400px' : undefined
            };
            //console.info('update attributes : ' + JSON.stringify(this.attributes))
        }
    };
    prototype.update();
    return prototype;
}
function VariableRepository() {
    // variabeltje gaat waarschijnlijk via constructor oid
    var context = {
        maxChildVariables: 600
    };
    // console.info('new VariableRepository constructed, expecting once during web-app lifecycle.')
    // we aqquire are a new Model instance from the json template, once resolved we inject it into the Service wrapper.
    var v05Instance = json['v05instance'];
    var userFormulas = json['defaultmath'];
    var importData = json['v05baseimportinstance'];
    var v05layout = json['v05layout'];
    // Retrieve user-formula's.
    // FormulaBootstrap is responsible for parsing the String formula's into javascript functions
    context.modelBuilder = new FormulaBootstrap(v05Instance, userFormulas);
    // the CalculationModel is the DataStore, which makes modifications on the Document which is given in constructor
    context.activeModel = new CalculationModel(v05Instance);
    context.calcDocument = new CalculationDocument(importData);
    // have to do something with the parent/child relation here too
    // from here the one and only IVariableRepository Interface function was exposed, which is am very happy with.

    var timeline0Columns = context.calcDocument.viewmodes.detl.columns[0];
    var ctx0 = timeline0Columns[0];
    var ctx0 = timeline0Columns[1];
    var defaultQuery = {
        "timeline": 0,
        "start": 0,
        "end": 4
    };

    function templateVariable(varname) {
        var variable = context.activeModel[varname];
        // except the functions a node has to support, this is quite many, but possible
        var prototype = {
            _key: varname,
            key: function (newValue) {
                if (typeof newValue === 'undefined') {
                    return this._key;
                }

                this._key = newValue;
            },
            _title: varname,
            title: function (newValue) {
                if (typeof newValue === 'undefined') {
                    return this._title;
                }

                this._title = newValue;
            },
            _attributes: {},
            attributes: function (newValue) {
                if (typeof newValue === 'undefined') {
                    return this._attributes;
                }

                //
                if (variable !== undefined) {
                    variable.setValue(variable.hIndex[0], 0, ctx0, parseFloat(newValue.value));
                    updateAll();
                }
                //

                this._attributes = newValue;
            },
            _children: [],
            children: function (newValue) {
                if (this._children.length <= 0) {
                    var variable = context.activeModel[this._key];
                    var children = [];
                    if (variable !== undefined && v05layout[this._key] !== undefined) {
                        for (var childname in v05layout[this._key]) {
                            var childVariable = cacheVars[childname];
                            if (childVariable == undefined) {
                                childVariable = templateVariable(childname);
                                cacheVars[childname] = childVariable;
                            }
                            children.push(childVariable);
                        }
                    }

                    this._children = children;
                }

                return this._children;
            },
            _contexts: [],
            contexts: function (query) {
                if (typeof query !== 'undefined') {
                    //console.info(query);
                    query = query === undefined ? defaultQuery : JSON.parse(query);

                    //console.info(query);
                    //for now just quick fix (variable.account == 1058 ? 'doc' : 'detl')
                    //doc type should just return two entrees, TITLE,DOCVALUE
                    var cols = context.calcDocument.viewmodes.detl.columns[query.timeline].slice(query.start, (variable.account == 1058 ? 1 : query.end));
                    // console.info('getContexts called with query ' + query)
                    var contexts = [];
                    cols.forEach(function (elem) {
                        contexts.push(templateContext(variable, elem));
                    });

                    this._contexts = contexts;
                }

                return this._contexts;
            },
            update: function () {
                //console.info('update variable : ' + varname);
                this._attributes.value = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, ctx0);
                this._attributes.style = {
                    color: 'red'
                };
                this._contexts.forEach(function (elem) {
                    elem.update();
                });
            }
        };
        prototype.update();
        return prototype;
    }

// from here the one and only IVariableRepository Interface function was exposed, which is am very happy with.
    this.findByKey = function (variableName) {
        var foundVariable = cacheVars[variableName];
        if (foundVariable === undefined) {
            foundVariable = templateVariable(variableName);
            cacheVars[variableName] = foundVariable;
        }
        return foundVariable;
    };
}
