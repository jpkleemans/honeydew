/**
 * Dit is ons discussie stuk,<br>
 * Een gedeelte gaat de javascript engine in.<br>
 * Ander gedeelte als er iets over blijft in een soort van adaptertje in TypeScript jullie kant op
 */
var cacheVars = {};
function updateAll()
{
    console.info('update all:  ' + Object.keys(cacheVars))
    for (var variableName in cacheVars)
    {
        cacheVars[variableName].update();
    }
}
function templateContext(context, variable, query)
{
    var prototype = {
        key: query.columnidx,
        title: query.columnidx,
        attributes: {},
        setAttributes: function (attributes)
        {
            console.info('templateContext change attributes' + JSON.stringify(attributes))
            if (variable !== undefined)
            {
                variable.setValue(variable.hIndex[0], 0, context.calcDocument.viewmodes.detl.columns[query.timelineidx][query.columnidx], attributes.value == null ? null : parseFloat(attributes.value));
            }
            this.attributes = attributes;
            updateAll();
        },
        update: function ()
        {
            this.attributes.value = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, context.calcDocument.viewmodes.detl.columns[query.timelineidx][query.columnidx]);
            this.attributes.required = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 2, context.calcDocument.viewmodes.detl.columns[query.timelineidx][query.columnidx]);
            this.attributes.entered = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 4, context.calcDocument.viewmodes.detl.columns[query.timelineidx][query.columnidx]);
            this.attributes.visible = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 1, context.calcDocument.viewmodes.detl.columns[query.timelineidx][query.columnidx]);
            this.attributes.style = {
                color: 'green'
            }
            console.info('update attributes : ' + JSON.stringify(this.attributes))
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
    var dummqueries = [{
        timelineidx: 0,
        columnidx: 1
    }, {
        timelineidx: 0,
        columnidx: 2
    }];
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
                    variable.setValue(variable.hIndex[0], 0, context.calcDocument.viewmodes.detl.columns[0][0], parseFloat(attributes.value));
                }
                this.attributes = attributes;
                updateAll();
            },
            getContexts: function (query)
            {
                // console.info('getContexts called with query ' + query)
                this.contexts = [templateContext(context, variable, dummqueries[0]), templateContext(context, variable, dummqueries[1])];
            },
            update: function ()
            {
                console.info('update variable : ' + varname)
                this.attributes.value = variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, context.calcDocument.viewmodes.detl.columns[0][0]);
                this.attributes.style = {
                    color: 'red'
                }
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
            var childs = [];
            if (variable !== undefined && v05layout[parentChildname] !== undefined)
            {
                for (var childname in v05layout[parentChildname])
                {
                    var childVariable = cacheVars[childname];
                    if (childVariable == undefined)
                    {
                        childVariable = templateVariable(childname);
                        childVariable.expandChildren = proxyChildren(childVariable, childname);
                        cacheVars[childname] = childVariable;
                    }
                    childs.push(childVariable);
                }
            }
            // console.info('called children for ' + parentChildname + ' returned ' + childs.length)
            tVar.children = childs;
        };
    }

    // from here the one and only IVariableRepository Interface function was exposed, which is am very happy with.
    this.findByKey = function (key, scope)
    {
        var tVar = cacheVars[key];
        if (tVar === undefined)
        {
            tVar = templateVariable(key);
            tVar.expandChildren = proxyChildren(tVar, key);
            cacheVars[key] = tVar;
        }
        return tVar;
    };
}
