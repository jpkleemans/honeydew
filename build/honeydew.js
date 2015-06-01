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
        function UIVariable(key, title, attributes, children, contexts) {
            if (attributes === void 0) { attributes = {}; }
            if (children === void 0) { children = []; }
            if (contexts === void 0) { contexts = []; }
            this.key = key;
            this.title = title;
            this.attributes = attributes;
            this.children = children;
            this.contexts = contexts;
        }
        return UIVariable;
    })();
    Honeydew.UIVariable = UIVariable;
})(Honeydew || (Honeydew = {}));
/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
var Honeydew;
(function (Honeydew) {
    var DirectiveFactory = (function () {
        function DirectiveFactory() {
        }
        DirectiveFactory.createFesBindAttributes = function () {
            var directive = function ($compile, variables) {
                return new Honeydew.FesBindAttributes($compile, variables, new Honeydew.VariableInitializer(variables));
            };
            directive['$inject'] = ['$compile', 'IVariableRepository'];
            return directive;
        };
        DirectiveFactory.createFesRepeat = function () {
            var directive = function ($compile, variables) {
                return new Honeydew.FesRepeat($compile, variables, new Honeydew.VariableInitializer(variables));
            };
            directive['$inject'] = ['$compile', 'IVariableRepository'];
            return directive;
        };
        return DirectiveFactory;
    })();
    Honeydew.DirectiveFactory = DirectiveFactory;
})(Honeydew || (Honeydew = {}));
/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />
var Honeydew;
(function (Honeydew) {
    var VariableInitializer = (function () {
        /**
         * Instantiate FesRepeat directive
         *
         * @param variables
         */
        function VariableInitializer(variables) {
            this.variables = variables;
        }
        /**
         * Init a variable on a scope
         *
         * @param key
         * @param scope
         */
        VariableInitializer.prototype.init = function (key, scope) {
            var variable = this.variables.findByKey(key);
            scope[key] = this.createUIVariable(variable);
        };
        /**
         * Create UIVariable from IVariable
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        VariableInitializer.prototype.createUIVariable = function (variable) {
            var key = variable.getKey();
            var title = variable.getTitle();
            var attributes = variable.getAttributes();
            var uiVariable = new Honeydew.UIVariable(key, title, attributes);
            return uiVariable;
        };
        /**
         * Create UIContext from IContext
         *
         * @param context
         * @returns {Honeydew.UIContext}
         */
        VariableInitializer.prototype.createUIContext = function (context) {
            //var key = variable.getKey();
            //var title = variable.getTitle();
            var attributes = context.getAttributes();
            var uiContext = new Honeydew.UIContext(attributes);
            return uiContext;
        };
        VariableInitializer.prototype.createUIChildren = function (children) {
            var uiChildren = [];
            var i = children.length;
            while (i--) {
                var uiChild = this.createUIVariable(children[i]);
                uiChildren.push(uiChild);
            }
            return uiChildren;
        };
        VariableInitializer.prototype.createUIContexts = function (contexts) {
            var uiContexts = [];
            var i = contexts.length;
            while (i--) {
                var uiContext = this.createUIContext(contexts[i]);
                uiContexts.push(uiContext);
            }
            return uiContexts;
        };
        return VariableInitializer;
    })();
    Honeydew.VariableInitializer = VariableInitializer;
})(Honeydew || (Honeydew = {}));
/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />
var Honeydew;
(function (Honeydew) {
    var FesBindAttributes = (function () {
        /**
         * Instantiate FesBindAttributes directive
         *
         * @param $compile
         * @param variableInitializer
         */
        function FesBindAttributes($compile, variables, variableInitializer) {
            var _this = this;
            this.variables = variables;
            this.variableInitializer = variableInitializer;
            this.link = function (scope, element, attrs) {
                var key = attrs['fesBindAttributes'];
                if (scope[key] === undefined) {
                    _this.variableInitializer.init(key, scope);
                }
                var variable = _this.variables.findByKey(key); // TODO: put this as property inside UIVariable...
                _this.setObservers(variable, key, scope);
                _this.setAttributes(key, scope[key].attributes, element);
                element.removeAttr('fes-bind-attributes');
                $compile(element)(scope);
            };
        }
        /**
         * Set observers for variable on scope
         *
         * @param key
         * @param scope
         */
        FesBindAttributes.prototype.setObservers = function (variable, key, scope) {
            variable.observe('change:attributes', function (newAttrs) {
                console.log(newAttrs);
            });
            scope.$watch(key + '.attributes', function (newAttrs) {
                variable.setAttributes(newAttrs);
            }, true);
        };
        /**
         * Set attributes on element
         *
         * @param key
         * @param attributes
         * @param element
         */
        FesBindAttributes.prototype.setAttributes = function (key, attributes, element) {
            for (var attr in attributes) {
                if (attributes.hasOwnProperty(attr)) {
                    element.attr('ng-attr-' + attr, '{{' + key + '.attributes.' + attr + '}}');
                }
            }
            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', key + '.attributes.value');
        };
        return FesBindAttributes;
    })();
    Honeydew.FesBindAttributes = FesBindAttributes;
})(Honeydew || (Honeydew = {}));
/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />
var Honeydew;
(function (Honeydew) {
    var FesRepeat = (function () {
        /**
         * Instantiate FesRepeat directive
         *
         * @param $compile
         * @param variables
         * @param variableInitializer
         */
        function FesRepeat($compile, variables, variableInitializer) {
            var _this = this;
            this.priority = 1005;
            this.terminal = true;
            this.variables = variables;
            this.variableInitializer = variableInitializer;
            this.link = function (scope, element, attrs) {
                var expression = attrs['fesRepeat'];
                console.log(expression);
                var key = expression.match(new RegExp("in (\\S[^.\\s]*)(?:.*)$"))[1];
                var property = expression.match(new RegExp("in (?:\\S[^.]*).(\\S*)(?:.*)$"))[1];
                if (scope[key] === undefined) {
                    _this.variableInitializer.init(key, scope);
                }
                var variable = _this.variables.findByKey(key); // TODO: put this as property inside UIVariable...
                switch (property) {
                    case 'children':
                        var children = variable.getChildren();
                        var uiChildren = _this.variableInitializer.createUIChildren(children);
                        scope[key].children = uiChildren;
                        break;
                    case 'contexts':
                        var query = attrs['fesContextQuery'];
                        var contexts = variable.getContexts(query);
                        var uiContexts = _this.variableInitializer.createUIContexts(contexts);
                        scope[key].contexts = uiContexts;
                        break;
                }
                element.attr('ng-repeat', expression);
                element.removeAttr('fes-repeat');
                $compile(element)(scope);
            };
        }
        return FesRepeat;
    })();
    Honeydew.FesRepeat = FesRepeat;
})(Honeydew || (Honeydew = {}));
/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />
//please insert Directives like this
//or another "easier/cleaner" way, don't combine all Directives into one, will mess up the structure
//not sure if Directive is the correct way to make a Reload, i want a button to reload a Directive.
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
var Honeydew;
(function (Honeydew) {
    var Module = (function () {
        function Module() {
        }
        Module.main = function (angular) {
            return angular.module('honeydew', [])
                .constant('IVariableRepository', new VariableRepository())
                .directive('fesBindAttributes', Honeydew.DirectiveFactory.createFesBindAttributes())
                .directive('fesRepeat', Honeydew.DirectiveFactory.createFesRepeat());
        };
        return Module;
    })();
    Honeydew.Module = Module;
})(Honeydew || (Honeydew = {}));
Honeydew.Module.main(angular);
