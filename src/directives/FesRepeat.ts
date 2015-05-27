/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class FesRepeat
    {
        private $compile:angular.ICompileService;
        public link;
        private variables;
        public priority = 1005;

        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository)
        {
            this.$compile = $compile;
            this.variables = variables;

            this.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
            {
                var repeat = attrs['ngRepeat'];
                var repeatvariable = repeat.match('in (.*)$')[1];
                var variable = this.variables.findByKey('ROOT');
                scope['ROOT'] = variable;
                console.log(scope['ROOT']);
            };
        }
    }
}
