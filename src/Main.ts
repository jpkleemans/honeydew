/// <reference path="../src/factories/DirectiveFactory.ts" />
/// <reference path="../src/factories/ControllerFactory.ts" />

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
                .constant('IVariableRepository', new VariableRepository())
                .controller('FesController', Honeydew.ControllerFactory.createFesController())
                .directive('fesInit', Honeydew.DirectiveFactory.createFesInit())
                .directive('bindAttributes', Honeydew.DirectiveFactory.createBindAttributes())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
}

Honeydew.Module.main(angular);
