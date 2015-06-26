/// <reference path="factories/DirectiveFactory.ts" />
/// <reference path="factories/ControllerFactory.ts" />
/// <reference path="factories/ServiceFactory.ts" />
/// <reference path="utilities/ServiceContainer.ts" />
/// <reference path="modules/RuntimeModule.ts" />

module Honeydew
{
    export class Module
    {
        public static main(angular)
        {
            var container = new ServiceContainer();
            var module = new RuntimeModule(container);

            return angular.module('honeydew', [])
                .factory('ElementTemplates', Honeydew.ServiceFactory.createElementTemplates())
                .constant('IVariableRepository', container.get('VariableRepository'))
                .controller('FesController', Honeydew.ControllerFactory.createFesController())
                .directive('fesElement', Honeydew.DirectiveFactory.createFesElement())
                .directive('fesInit', Honeydew.DirectiveFactory.createFesInit())
                .directive('bindAttributes', Honeydew.DirectiveFactory.createBindAttributes())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
}

Honeydew.Module.main(angular);
