/// <reference path="../src/factories/DirectiveFactory.ts" />

declare
class VariableRepository
{
}

module Honeydew
{
    export  interface IMainAppCtrl
    {
    }

    export class MainAppCtrl implements IMainAppCtrl
    {
        public colulmnQuery:any;

        constructor()
        {
            this.colulmnQuery = {
                "test": "test"
            };
        }
    }


    export class Module
    {
        public static main(angular)
        {
            return angular.module('honeydew', [])
                .constant('IVariableRepository', new VariableRepository())
                .controller('ExampleController', MainAppCtrl)
                .directive('fesBindAttributes', Honeydew.DirectiveFactory.createFesBindAttributes())
                .directive('fesRepeat', Honeydew.DirectiveFactory.createFesRepeat())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate())
                ;
        }
    }
}

Honeydew.Module.main(angular);
