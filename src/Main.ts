/// <reference path="../src/factories/DirectiveFactory.ts" />
/// <reference path="../src/factories/ControllerFactory.ts" />
/// <reference path="../src/Adapter/VariableRepository.ts" />

declare var json;

//declare class VariableRepository
//{
//}

module Honeydew
{
    export class Module
    {
        public static main(angular)
        {
            var v05Instance = json['v05instance'];
            var userFormulas = json['defaultmath'];
            var importData = json['v05baseimportinstance'];
            var v05layout = json['v05layout'];

            var variableRepository = new VariableRepository(v05Instance, userFormulas, importData, v05layout);

            return angular.module('honeydew', [])
                .constant('IVariableRepository', variableRepository)
                .controller('FesController', Honeydew.ControllerFactory.createFesController())
                .directive('fesInit', Honeydew.DirectiveFactory.createFesInit())
                .directive('bindAttributes', Honeydew.DirectiveFactory.createBindAttributes())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
}

Honeydew.Module.main(angular);
