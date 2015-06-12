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

        public priority = 1005;
        public terminal = true;

        /**
         * Instantiate FesRepeat directive
         *
         * @param $compile
         * @param variables
         * @param variableInitializer
         */
        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository)
        {
            this.variables = variables;

            this.compile = () =>
            {
                return {
                    pre: (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
                    {
                        var expression = attrs['fesRepeat'];
                        var key = expression.match(new RegExp("in (\\S[^.\\s]*)(?:.*)$"))[1];
                        var property = expression.match(new RegExp("in (?:\\S[^.]*).(\\S*)(?:.*)$"))[1];

                        if (scope[key] === undefined)
                        {
                            var variable = this.variables.findByKey(key, scope);
                            scope[key] = variable;
                        }
                        switch (property)
                        {
                            case 'children':
                                scope[key].expandChildren();
                                break;
                            case 'contexts':
                                scope.$watch('columnQuery', function(value)
                                {
                                    console.log("watch triggered");
                                    scope[key].getContexts(value);
                                })
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
