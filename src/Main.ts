/// <reference path="../src/factories/DirectiveFactory.ts" />
/// <reference path="../src/factories/ControllerFactory.ts" />
/// <reference path="../src/factories/ServiceFactory.ts" />

declare class VariableRepository
{
}

module Honeydew
{
    export class Module
    {
        public static main(angular)
        {
            return angular.module('honeydew', [])
                .factory('ElementTemplates', Honeydew.ServiceFactory.createElementTemplates())
                .constant('IVariableRepository', new VariableRepository())
                .controller('FesController', Honeydew.ControllerFactory.createFesController())
                .directive('fesElement', Honeydew.DirectiveFactory.createFesElement())
                .directive('bindAttributes', Honeydew.DirectiveFactory.createBindAttributes())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
}

Honeydew.Module.main(angular);
