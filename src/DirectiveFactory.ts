/// <reference path="type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class DirectiveFactory
    {
        //public static FesInit()
        //{
        //    var directive = (variables:Fes.IVariableRepository) =>
        //    {
        //        return new FesInit(variables);
        //    };
        //
        //    directive['$inject'] = ['IVariableRepository'];
        //
        //    return directive;
        //}

        public static FesBindAttributes()
        {
            var directive = ($compile:angular.ICompileService,variables:Fes.IVariableRepository) =>
            {
                return new FesBindAttributes($compile, variables);
            };

            directive['$inject'] = ['$compile', 'IVariableRepository'];

            return directive;
        }
    }
}
