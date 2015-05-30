/// <reference path="../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class DirectiveFactory
    {
        public static FesBindAttributes()
        {
            var directive = ($compile: angular.ICompileService, variables: Fes.IVariableRepository) =>
            {
                return new FesBindAttributes($compile, variables);
            };

            directive['$inject'] = ['$compile', 'IVariableRepository'];

            return directive;
        }

        public static FesRepeat()
        {
            var directive = ($compile: angular.ICompileService, variables: Fes.IVariableRepository) =>
            {
                return new FesRepeat($compile, variables);
            };

            directive['$inject'] = ['$compile', 'IVariableRepository'];

            return directive;
        }
    }
}
