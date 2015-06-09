/// <reference path="../src/factories/DirectiveFactory.ts" />

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
                .directive('fesBindAttributes', Honeydew.DirectiveFactory.createFesBindAttributes())
                .directive('fesRepeat', Honeydew.DirectiveFactory.createFesRepeat())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
} 

Honeydew.Module.main(angular);
