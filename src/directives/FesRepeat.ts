/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class FesRepeat
    {
        /**
         * Modify the DOM
         */
        public link;

        /**
         * FES VariableRepository
         */
        private variables:Fes.IVariableRepository;

        /**
         * VariableInitializer
         */
        private variableInitializer:VariableInitializer;
        public priority = 1005;
        public terminal = true;

        /**
         * Instantiate FesRepeat directive
         *
         * @param $compile
         * @param variables
         * @param variableInitializer
         */
        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository, variableInitializer:VariableInitializer)
        {
            this.variables = variables;
            this.variableInitializer = variableInitializer;

            this.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
            {
                var expression = attrs['fesRepeat'];
                console.log(expression);
                var key = expression.match(new RegExp("in (\\S[^.\\s]*)(?:.*)$"))[1];
                var property = expression.match(new RegExp("in (?:\\S[^.]*).(\\S*)(?:.*)$"))[1];

                if (scope[key] === undefined) {
                    this.variableInitializer.init(key, scope);
                }

                switch (property) {
                    case 'children':
                        var children = scope[key].variable.getChildren();
                        var uiChildren = this.variableInitializer.createUIChildren(children);
                        scope[key].children = uiChildren;
                        break;
                    case 'contexts':
                        var query = attrs['fesContextQuery'];
                        var contexts = scope[key].variable.getContexts(query);
                        var uiContexts = this.variableInitializer.createUIContexts(contexts);
                        scope[key].contexts = uiContexts;
                        break;
                }

                element.attr('ng-repeat', expression);

                element.removeAttr('fes-repeat');
                $compile(element)(scope);
            }
        }
    }
}
