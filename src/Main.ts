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
                .directive('fesRepeat', Honeydew.DirectiveFactory.createFesRepeat());
        }
    }
}

Honeydew.Module.main(angular);
