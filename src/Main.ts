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
            // create service container
            var container = new ServiceContainer();
            // register runtime services
            var module = new RuntimeModule(container);

            // TODO: Factory-classes worden nu gebruikt voor de dependency injection van angular.
            // Echter kan dit waarschijnlijk ook zonder factory, maar d.m.v. de $inject property.
            // Zie: http://kwilson.me.uk/blog/writing-cleaner-angularjs-with-typescript-and-controlleras/
            // Mooist is om dit uiteindelijk via de ServiceContainer te regelen.

            return angular.module('honeydew', [])
                .constant('IVariableRepository', container.resolve('VariableRepository'))
                .factory('ElementTemplates', Honeydew.ServiceFactory.createElementTemplates())
                .controller('FesController', Honeydew.ControllerFactory.createFesController())
                .directive('fesElement', Honeydew.DirectiveFactory.createFesElement())
                .directive('fesInit', Honeydew.DirectiveFactory.createFesInit())
                .directive('bindAttributes', Honeydew.DirectiveFactory.createBindAttributes())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
}

Honeydew.Module.main(angular);
