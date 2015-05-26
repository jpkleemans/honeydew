/// <reference path="type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class DirectiveFactory
    {
        public static FesInit()
        {
            var directive = (Fes.IVariableRepository) =>
            {
                return new FesInit();
            };

            directive['$inject'] = ['/*list of dependencies*/'];

            return directive;
        }
    }
}
