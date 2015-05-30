function VariableRepository()
{
	this.findByKey = function(key)
	{
		console.info('looking for: ' + key)
		var observers = {};
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
					value : 10,
					style : "color:red;"
				};
			},
			getKey : function()
			{
				return "ROOT";
			},
			getTitle : function()
			{
				return "ROOT";
			},
			getChildren : function()
			{
				return [ {
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
							value : 10,
							style : "color:red;"
						};
					},
					getKey : function()
					{
						return "CHILD1";
					},
					getTitle : function()
					{
						return "CHILD1";
					},
					getChildren : function()
					{
						return [];
					},
					getContext : function(query)
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
								return {};
							},
							getKey : function()
							{
								return "";
							},
							getTitle : function()
							{
								return "";
							}
						};
					}
				}, {
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
							value : 10,
							style : "color:red;"
						};
					},
					getKey : function()
					{
						return "CHILD2";
					},
					getTitle : function()
					{
						return "CHILD2";
					},
					getChildren : function()
					{
						return [];
					},
					getContext : function(query)
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
								return {};
							},
							getKey : function()
							{
								return "";
							},
							getTitle : function()
							{
								return "";
							}
						};
					}
				} ];
			},
			getContext : function(query)
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
						return {};
					},
					getKey : function()
					{
						return "";
					},
					getTitle : function()
					{
						return "";
					}
				};
			}
		};
	};
}

var Honeydew;
(function (Honeydew) {
    var UIContext = (function () {
        function UIContext(attributes) {
            this.attributes = attributes;
        }
        return UIContext;
    })();
    Honeydew.UIContext = UIContext;
})(Honeydew || (Honeydew = {}));
var Honeydew;
(function (Honeydew) {
    var UIVariable = (function () {
        function UIVariable(key, title, children, attributes) {
            if (attributes === void 0) { attributes = {}; }
            this.key = key;
            this.title = title;
            this.attributes = attributes;
            this.children = children;
        }
        return UIVariable;
    })();
    Honeydew.UIVariable = UIVariable;
})(Honeydew || (Honeydew = {}));
/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />
var Honeydew;
(function (Honeydew) {
    var FesBindAttributes = (function () {
        function FesBindAttributes($compile, variables) {
            var _this = this;
            this.scope = {};
            this.terminal = true;
            this.$compile = $compile;
            this.variables = variables;
            this.link = function (scope, element, attrs) {
                var variableKey = attrs['fesBindAttributes'];
                var variable = _this.variables.findByKey(variableKey);
                scope[variableKey] = _this.getUIVariable(variable);
                if (scope[variableKey] === undefined) {
                    throw new Error('Variable ' + variableKey + ' not initialized');
                }
                /*
                variable.observe('change:attributes', (newValue) =>
                {
                    console.log(newValue);
                });

                 scope.$watch(variableKey + '.attributes', function (newAttrs)
                 {
                 variable.setAttributes(newAttrs);
                 }, true);

                //var variableKey:string = attrs['fesBindAttributes'];

                */
                var attributes = scope[variableKey].attributes;
                _this.setAttributes(variableKey, attributes, element);
                element.removeAttr('fes-bind-attributes');
                _this.$compile(element)(scope);
            };
        }
        ///**
        // *
        // * @param scope
        // * @param element
        // * @param attrs
        // */
        //public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes):void
        //{
        //
        //}
        /**
         *
         * @param attrs
         * @param element
         */
        FesBindAttributes.prototype.setAttributes = function (variableKey, attrs, element) {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.attr('ng-attr-' + attr, '{{' + variableKey + '.attributes.' + attr + '}}');
                }
            }
            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', variableKey + '.attributes.value');
        };
        /**
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        FesBindAttributes.prototype.getUIVariable = function (variable) {
            var key = variable.getKey();
            var title = variable.getTitle();
            var attributes = variable.getAttributes();
            var children = [];
            var i = variable.getChildren().length;
            while (i--) {
                children.push(this.getUIVariable(variable.getChildren()[i]));
            }
            var UIVariable = new Honeydew.UIVariable(key, title, children, attributes);
            return UIVariable;
        };
        return FesBindAttributes;
    })();
    Honeydew.FesBindAttributes = FesBindAttributes;
})(Honeydew || (Honeydew = {}));
/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />
var Honeydew;
(function (Honeydew) {
    var FesInit = (function () {
        function FesInit(variables) {
            var _this = this;
            this.variables = variables;
            this.link = function (scope, element, attrs) {
                var variableKey = attrs['fesInit'];
                var variable = _this.variables.findByKey(variableKey);
                scope[variableKey] = _this.getUIVariable(variable);
            };
        }
        FesInit.prototype.getUIVariable = function (variable) {
            var key = variable.getKey();
            var title = variable.getTitle();
            var children = variable.getChildren();
            var UIVariable = new Honeydew.UIVariable(key, title, children);
            return UIVariable;
        };
        return FesInit;
    })();
    Honeydew.FesInit = FesInit;
})(Honeydew || (Honeydew = {}));
/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />
var Honeydew;
(function (Honeydew) {
    var FesRepeat = (function () {
        function FesRepeat($compile, variables) {
            var _this = this;
            this.priority = 1005;
            this.$compile = $compile;
            this.variables = variables;
            this.link = function (scope, element, attrs) {
                var repeat = attrs['ngRepeat'];
                var repeatvariable = repeat.match('in (.*)$')[1];
                var variable = _this.variables.findByKey('ROOT');
                scope['ROOT'] = variable;
                console.log(scope['ROOT']);
            };
        }
        return FesRepeat;
    })();
    Honeydew.FesRepeat = FesRepeat;
})(Honeydew || (Honeydew = {}));
/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />
var Reload = (function () {
    function Reload($location) {
        var _this = this;
        this.$location = $location;
        this.restrict = 'A';
        this.require = 'ngModel';
        this.templateUrl = 'myDirective.html';
        this.replace = true;
        this.link = function (scope, element, attrs, ctrl) {
            console.log(_this.$location);
        };
    }
    Reload.factory = function () {
        var directive = function ($location) { return new Reload($location); };
        directive.$inject = ['$location'];
        return directive;
    };
    return Reload;
})();
/// <reference path="type_definitions/angularjs/angular.d.ts" />
var Honeydew;
(function (Honeydew) {
    var DirectiveFactory = (function () {
        function DirectiveFactory() {
        }
        DirectiveFactory.FesBindAttributes = function () {
            var directive = function ($compile, variables) {
                return new Honeydew.FesBindAttributes($compile, variables);
            };
            directive['$inject'] = ['$compile', 'IVariableRepository'];
            return directive;
        };
        DirectiveFactory.FesRepeat = function () {
            var directive = function ($compile, variables) {
                return new Honeydew.FesRepeat($compile, variables);
            };
            directive['$inject'] = ['$compile', 'IVariableRepository'];
            return directive;
        };
        return DirectiveFactory;
    })();
    Honeydew.DirectiveFactory = DirectiveFactory;
})(Honeydew || (Honeydew = {}));

angular.module('app', [ 'honeydew' ]);
var context = {};
var app = angular.module('honeydew', []);
app.constant('IVariableRepository', new VariableRepository(context));
app.directive('fesBindAttributes', Honeydew.DirectiveFactory.FesBindAttributes());
app.directive('fesRepeat', Honeydew.DirectiveFactory.FesRepeat());
app.directive('reload', Reload.factory());
console.info('new variablerepository')
$.getJSON("V05.json", function(data)
{
	var activeCalcModel = undefined;
	var activeModel = undefined;
	modelBuilder = new FormulaBootstrap(data, {});
	console.info('loading new datastore')
	context.activeModel = new CalculationModel(data);
	// $.getJSON("testImport.json", function(document)
	// {
	// var values = [];// document.values;
	// activeModel._tContext = document;
	// activeCalcModel = new CalculationDocument(document);
	// });
	// console.info('Bootstrapped model: [' + activeModel._modelName + ']');
});
