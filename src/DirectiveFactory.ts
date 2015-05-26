/// <reference path="type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class DirectiveFactory
    {
        public static FesInit()
        {
            var directive = (variables:Fes.IVariableRepository) =>
            {
                return new FesInit(variables);
            };

            directive['$inject'] = ['IVariableRepository'];

            return directive;
        }

        public static FesBindAttributes()
        {
            var directive = ($compile:angular.ICompileService) =>
            {
                return new FesBindAttributes($compile);
            };

            directive['$inject'] = ['$compile'];

            return directive;
        }
    }
}
