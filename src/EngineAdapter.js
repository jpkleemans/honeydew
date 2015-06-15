/**
 * Dit is ons discussie stuk,<br>
 * Een gedeelte gaat de javascript engine in.<br>
 * Ander gedeelte als er iets over blijft in een soort van adaptertje in TypeScript jullie kant op
 */
var cacheVars = {};
var busy = false;
function updateAll()
{
    //console.info('update all:  ' + Object.keys(cacheVars));
    for (var variableName in cacheVars)
    {
        cacheVars[variableName].update();
    }
    busy = false;
}
function templateContext(variable, context)
{
    var prototype = {
        key: context.t,
        title: context.t,
        attributes: {},
        setAttributes: function (attributes)
        {
            //console.info('templateContext change attributes: ' + JSON.stringify(attributes));
            if (variable !== undefined)
            {
                variable.setValue(variable.hIndex[0], 0, context, attributes.value == null ? null : parseFloat(attributes.value));
                //this.attributes = attributes;
                updateAll();
            }
        },
        update: function ()
        {
            this.attributes.value = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, context);
            this.attributes.required = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 2, context);
            this.attributes.entered = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 4, context);
            this.attributes.disabled = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 3, context);

            this.attributes.style = {
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
function VariableRepository()
{
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

    function templateVariable(varname)
    {
        var variable = context.activeModel[varname];
        // except the functions a node has to support, this is quite many, but possible
        var prototype = {
            key: varname,
            title: varname,
            attributes: {},
            children: [],
            contexts: [],
            setAttributes: function (attributes)
            {
                // console.info('templateVariable change attributes' + JSON.stringify(attributes))
                if (variable !== undefined)
                {
                    variable.setValue(variable.hIndex[0], 0, ctx0, parseFloat(attributes.value));
                    //this.attributes = attributes;
                    updateAll();
                }
            },
            initContexts: function (query)
            {
                //console.info(query);
                query = query === undefined ? defaultQuery : JSON.parse(query);

                //console.info(query);
                //for now just quick fix (variable.account == 1058 ? 'doc' : 'detl')
                //doc type should just return two entrees, TITLE,DOCVALUE
                var cols = context.calcDocument.viewmodes.detl.columns[query.timeline].slice(query.start, (variable.account == 1058 ? 1 : query.end));
                // console.info('getContexts called with query ' + query)
                var contexts = [];
                cols.forEach(function (elem)
                {
                    contexts.push(templateContext(variable, elem));
                });
                this.contexts = contexts;
            },
            update: function ()
            {
                //console.info('update variable : ' + varname);
                this.attributes.value = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, ctx0);
                this.attributes.style = {
                    color: 'red'
                };
                this.contexts.forEach(function (elem)
                {
                    elem.update();
                });

            }
        };
        prototype.update();
        return prototype;
    }

    function proxyChildren(tVar, parentChildname)
    {
        return function ()
        {
            var variable = context.activeModel[parentChildname];
            var children = [];
            if (variable !== undefined && v05layout[parentChildname] !== undefined)
            {
                for (var childname in v05layout[parentChildname])
                {
                    var childVariable = cacheVars[childname];
                    if (childVariable == undefined)
                    {
                        childVariable = templateVariable(childname);
                        childVariable.initChildren = proxyChildren(childVariable, childname);
                        cacheVars[childname] = childVariable;
                    }
                    children.push(childVariable);
                }
            }
            // console.info('called children for ' + parentChildname + ' returned ' + children.length)
            tVar.children = children;
        };
    }

    // from here the one and only IVariableRepository Interface function was exposed, which is am very happy with.
    this.findByKey = function (variableName)
    {
        var foundVariable = cacheVars[variableName];
        if (foundVariable === undefined)
        {
            foundVariable = templateVariable(variableName);
            foundVariable.initChildren = proxyChildren(foundVariable, variableName);
            cacheVars[variableName] = foundVariable;
        }
        return foundVariable;
    };
}
