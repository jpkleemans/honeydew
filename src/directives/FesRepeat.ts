/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />
/// <reference path="../factories/ViewModelFactory.ts" />

module Honeydew
{
    export class FesRepeat
    {
        /**
         * Modify the DOM
         */
        public compile;

        /**
         * FES VariableRepository
         */
        private variables:Fes.IVariableRepository;

        /**
         * VariableInitializer
         */
        private viewModelFactory:ViewModelFactory;
        public priority = 1005;
        public terminal = true;

        /**
         * Instantiate FesRepeat directive
         *
         * @param $compile
         * @param variables
         * @param variableInitializer
         */
        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository, viewModelFactory:ViewModelFactory)
        {
            this.variables = variables;
            this.viewModelFactory = viewModelFactory;

            this.compile = () =>
            {
                return {
                    pre: (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
                    {
                        var expression = attrs['fesRepeat'];
                        var key = expression.match(new RegExp("in (\\S[^.\\s]*)(?:.*)$"))[1];
                        var property = expression.match(new RegExp("in (?:\\S[^.]*).(\\S*)(?:.*)$"))[1];

                        if (scope[key] === undefined) {
                            var variable = this.variables.findByKey(key, scope);
                            scope[key] = this.viewModelFactory.createUIVariable(variable);
                        }

                        switch (property) {
                            case 'children':
                                var children = scope[key].variable.getChildren();
                                var uiChildren = this.viewModelFactory.createUIVariables(children);
                                scope[key].children = uiChildren;
                                break;
                            case 'contexts':
                                var query = attrs['fesContextQuery'];
                                var contexts = scope[key].variable.getContexts(query);
                                var uiContexts = this.viewModelFactory.createUIContexts(contexts);
                                scope[key].contexts = uiContexts;
                                break;
                        }

                        element.attr('ng-repeat', expression);

                        element.removeAttr('fes-repeat');
                        $compile(element)(scope);
                    }
                };
            }
        }
    }
}
