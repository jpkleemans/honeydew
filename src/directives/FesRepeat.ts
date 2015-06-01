/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

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

                var key = expression.match(new RegExp("in (\S[^.\s]*)(?:.*)$"))[1];
                var property = 'children'; // property from bernard

                if (scope[key] === undefined) {
                    this.variableInitializer.init(key, scope);
                }

                var variable = this.variables.findByKey(key); // TODO: maybe put this as property inside UIVariable...

                switch (property) {
                    case 'children':
                        var children = variable.getChildren();
                        var uiChildren = this.variableInitializer.createUIChildren(children);
                        scope[key].children = uiChildren;
                        break;
                    case 'contexts':
                        var query = attrs['fesContextQuery'];
                        var contexts = variable.getContexts(query);
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
