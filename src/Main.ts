/// <reference path="../src/factories/DirectiveFactory.ts" />
/// <reference path="../src/factories/ControllerFactory.ts" />
/// <reference path="../src/Adapter/VariableRepository.ts" />
/// <reference path="../src/Adapter/ContextRepository.ts" />
/// <reference path="../src/Adapter/Context.ts" />
/// <reference path="../src/Adapter/Variable.ts" />

declare var json;

declare class VariableRepositoryOld
{
}

declare class CalculationDocument
{
    constructor(var1);
}

declare class CalculationModel
{
    constructor(var1);
}

declare class FormulaBootstrap
{
    constructor(var1, var2);
}

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

            var modelBuilder = new FormulaBootstrap(v05Instance, userFormulas); // ???? TODO: Uitleg Michael

            var calcModel = new CalculationModel(v05Instance);
            var calcDocument = new CalculationDocument(importData);

            var contextRepo = new ContextRepository(calcDocument, calcModel);
            var variableRepository = new VariableRepository(v05layout, contextRepo, calcModel);

            return angular.module('honeydew', [])
                //.constant('IVariableRepository', new VariableRepositoryOld())
                .constant('IVariableRepository', variableRepository)
                .controller('FesController', Honeydew.ControllerFactory.createFesController())
                .directive('fesInit', Honeydew.DirectiveFactory.createFesInit())
                .directive('bindAttributes', Honeydew.DirectiveFactory.createBindAttributes())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
}

Honeydew.Module.main(angular);
