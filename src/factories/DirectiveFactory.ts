/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class DirectiveFactory
    {
        public static createBindAttributes()
        {
            var directive = ($compile:angular.ICompileService, $injector:angular.auto.IInjectorService) =>
            {
                return new BindAttributes($compile, $injector);
            };

            directive['$inject'] = ['$compile', '$injector'];

            return directive;
        }

        public static createFesInit()
        {
            var directive = (variables:Fes.IVariableRepository) =>
            {
                return new FesInit(variables);
            };

            directive['$inject'] = ['IVariableRepository'];

            return directive;
        }

        public static createInlineTemplate()
        {
            var directive = ($templateCache) =>
            {
                return new InlineTemplate($templateCache);
            };

            directive['$inject'] = ['$templateCache'];

            return directive;
        }
    }
}
