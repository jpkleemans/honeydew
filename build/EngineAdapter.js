/**
 * Dit is ons discussie stuk,<br>
 * Een gedeelte gaat de javascript engine in.<br>
 * Ander gedeelte als er iets over blijft in een soort van adaptertje in TypeScript jullie kant op
 */
function VariableRepository()
{
	// variabeltje gaat waarschijnlijk via constructor oid
	var context = {
		maxChildVariables : 600
	};
	var dummqueries = [ {
		timelineidx : 0,
		columnidx : 1
	}, {
		timelineidx : 0,
		columnidx : 2
	} ];
	console.info('new VariableRepository constructed, expecting once during web-app lifecycle.')
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
	function templateContext(variable, query)
	{
		return {
			observe : function(event, callback)
			{
				//
			},
			setAttributes : function(attributes)
			{
				//
			},
			getAttributes : function()
			{
				return {
					value : variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, context.calcDocument.viewmodes.detl.columns[query.timelineidx][query.columnidx]),
					style : 'color:green'
				};
			},
			// variable, final
			getKey : function()
			{
				return "";
			}
		}
	}
	function templateVariable(varname)
	{
		var variable = context.activeModel[varname];
		var observers = {};
		// except the functions a node has to support, this is quite many, but possible
		return {
			observe : function(event, callback)
			{
				if (observers[event] === undefined)
				{
					observers[event] = [];
				}
				observers[event].push(callback);
			},
			setAttributes : function(attributes)
			{
				var i = observers['change:attributes'].length;
				while (i--)
				{
					observers['change:attributes'][i]();
				}
			},
			getAttributes : function()
			{
				return {
					// just test if the structure works
					value : variable == undefined ? 0 : variable.getValue(variable.hIndex[0], 0, context.calcDocument.viewmodes.detl.columns[0][0]),
					style : "color:red;"
				};
			},
			// would expect this just to be an variable, they should not modify and initialized 'final' way
			getKey : function()
			{
				return varname;
			},
			// would expect this to be an attribute
			getTitle : function()
			{
				return varname;
			},
			getChildren : function()
			{
				return [];
			},
			getContexts : function(query)
			{
				console.info('getContexts called with query ' + query)
				return [ templateContext(variable, dummqueries[0]), templateContext(variable, dummqueries[1]) ];
			}
		}
	}
	function proxyChildren(parentChildname)
	{
		return function()
		{
			var variable = context.activeModel[parentChildname];
			var childs = [];
			if (variable !== undefined && v05layout[parentChildname] !== undefined)
			{
				for ( var childname in v05layout[parentChildname])
				{
					var childVariable = templateVariable(childname);
					childVariable.getChildren = proxyChildren(childname);
					childs.push(childVariable);
				}
			}
			console.info('called children for ' + parentChildname + ' returned ' + childs.length)
			return childs;
		};
	}
	// from here the one and only IVariableRepository Interface function was exposed, which is am very happy with.
	this.findByKey = function(key)
	{
		var tVar = templateVariable(key);
		tVar.getChildren = proxyChildren(key);
		return tVar;
	};
}
