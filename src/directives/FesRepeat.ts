/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

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
         * Order in which the directive will be applied
         *
         * @type {number}
         */
        public priority:number = 1005;

        /**
         * Skip lower priority directives on the element
         *
         * @type {boolean}
         */
        public terminal:boolean = true;

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

                        if (scope[key] === undefined) {
                            scope[key] = this.variables.findByKey(key);
                        }

                        // Lazy loading
                        switch (property) {
                            case 'children':
                                scope[key].initChildren();
                                break;
                            case 'contexts':
                                scope.$watch('columnQuery', function (value)
                                {
                                    scope[key].initContexts(value);
                                });
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
