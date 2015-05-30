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
/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />
var Reload = (function () {
    function Reload($compile) {
        var _this = this;
        this.$compile = $compile;
        this.link = function (scope, element, attrs, ctrl) {
            console.log(_this.$compile);
        };
    }
    Reload.factory = function () {
        var directive = function ($compile) { return new Reload($compile); };
        directive.$inject = ['$compile'];
        return directive;
    };
    return Reload;
})();
/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../directives/reload.ts" />
var App = (function () {
    function App() {
    }
    App.createModule = function (angular) {
        angular.module('app', ['honeydew']);
        angular.module('honeydew', [])
            .constant('IVariableRepository', new VariableRepository())
            .directive('reload', Reload.factory())
            .directive('fesBindAttributes', Honeydew.DirectiveFactory.FesBindAttributes())
            .directive('fesRepeat', Honeydew.DirectiveFactory.FesRepeat());
        console.info('Angular bindings done.');
    };
    return App;
})();
App.createModule(angular);
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
