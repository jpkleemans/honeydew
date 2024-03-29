/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class FesInit
    {
        public priority = 1001;
        public compile;

        /**
         * Instantiate FesInit directive
         *
         * @param variables
         */
        constructor(variables:IVariableRepository)
        {
            this.compile = () =>
            {
                return {
                    pre: (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
                    {
                        var key = attrs['fesInit'];

                        if (scope[key] === undefined) {
                            scope[key] = variables.find(key);
                        }
                    }
                };
            }
        }
    }
}
