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
        function UIVariable(key, title, attributes, children) {
            if (attributes === void 0) { attributes = {}; }
            if (children === void 0) { children = []; }
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
var Honeydew;
(function (Honeydew) {
    var FesBindAttributes = (function () {
        function FesBindAttributes($compile, variables) {
            var _this = this;
            this.$compile = $compile;
            this.variables = variables;
            this.link = function (scope, element, attrs) {
                var variableKey = attrs['fesBindAttributes'];
                var variable = _this.variables.findByKey(variableKey);
                scope[variableKey] = _this.getUIVariable(variable);
                variable.observe('change:attributes', function () {
                    console.log('fired!');
                });
                //var variableKey:string = attrs['fesBindAttributes'];
                if (scope[variableKey] === undefined) {
                    throw new Error('Variable ' + variableKey + ' not initialized');
                }
                var attributes = scope[variableKey].attributes;
                scope.$watch(variableKey + '.attributes', function (newAttrs) {
                    variable.setAttributes(newAttrs);
                }, true);
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
            var UIVariable = new Honeydew.UIVariable(key, title, attributes);
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
        ///**
        // *
        // * @param scope
        // * @param element
        // * @param attrs
        // */
        //public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes):void
        //{
        //    var variableKey:string = attrs['fesInit'];
        //    var variable:Fes.IVariable = this.variables.findByKey(variableKey);
        //
        //    scope['variable'] = this.getUIVariable(variable);
        //}
        /**
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        FesInit.prototype.getUIVariable = function (variable) {
            var key = variable.getKey();
            var title = variable.getTitle();
            var UIVariable = new Honeydew.UIVariable(key, title);
            return UIVariable;
        };
        return FesInit;
    })();
    Honeydew.FesInit = FesInit;
})(Honeydew || (Honeydew = {}));
/// <reference path="type_definitions/angularjs/angular.d.ts" />
var Honeydew;
(function (Honeydew) {
    var DirectiveFactory = (function () {
        function DirectiveFactory() {
        }
        //public static FesInit()
        //{
        //    var directive = (variables:Fes.IVariableRepository) =>
        //    {
        //        return new FesInit(variables);
        //    };
        //
        //    directive['$inject'] = ['IVariableRepository'];
        //
        //    return directive;
        //}
        DirectiveFactory.FesBindAttributes = function () {
            var directive = function ($compile, variables) {
                return new Honeydew.FesBindAttributes($compile, variables);
            };
            directive['$inject'] = ['$compile', 'IVariableRepository'];
            return directive;
        };
        return DirectiveFactory;
    })();
    Honeydew.DirectiveFactory = DirectiveFactory;
})(Honeydew || (Honeydew = {}));
