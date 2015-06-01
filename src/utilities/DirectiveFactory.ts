/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class DirectiveFactory
    {
        public static createFesBindAttributes()
        {
            var directive = ($compile:angular.ICompileService, variables:Fes.IVariableRepository) =>
            {
                return new FesBindAttributes($compile, variables, new VariableInitializer(variables));
            };

            directive['$inject'] = ['$compile', 'IVariableRepository'];

            return directive;
        }

        public static createFesRepeat()
        {
            var directive = ($compile:angular.ICompileService, variables:Fes.IVariableRepository) =>
            {
                return new FesRepeat($compile, variables, new VariableInitializer(variables));
            };

            directive['$inject'] = ['$compile', 'IVariableRepository'];

            return directive;
        }
    }
}
