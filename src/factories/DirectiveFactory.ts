/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class DirectiveFactory
    {
        public static createFesBindAttributes()
        {
            var directive = ($compile:angular.ICompileService, variables:Fes.IVariableRepository, $injector:angular.auto.IInjectorService) =>
            {
                return new FesBindAttributes($compile, variables, $injector);
            };

            directive['$inject'] = ['$compile', 'IVariableRepository', '$injector'];

            return directive;
        }

        public static createFesRepeat()
        {
            var directive = ($compile:angular.ICompileService, variables:Fes.IVariableRepository) =>
            {
                return new FesRepeat($compile, variables);
            };

            directive['$inject'] = ['$compile', 'IVariableRepository'];

            return directive;
        }

        public static createFesElement()
        {
            var directive = () =>
            {
                return new FesElement();
            };

            directive['$inject'] = ['ElementTemplates'];

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
