/// <reference path="../src/factories/DirectiveFactory.ts" />
/// <reference path="../src/factories/ControllerFactory.ts" />
/// <reference path="../src/factories/ServiceFactory.ts" />
/// <reference path="repositories/VariableRepository.ts" />
/// <reference path="repositories/ContextRepository.ts" />
/// <reference path="viewmodels/Context.ts" />
/// <reference path="viewmodels/Variable.ts" />

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

            new FormulaBootstrap(v05Instance, userFormulas);

            var calcModel = new CalculationModel(v05Instance);
            var calcDocument = new CalculationDocument(importData);

            var contextRepo = new ContextRepository(calcDocument, calcModel);
            var cache = new Cache<Fes.IVariable>();
            var variableRepository = new VariableRepository(v05layout, contextRepo, cache, calcModel);

            return angular.module('honeydew', [])
                .factory('ElementTemplates', Honeydew.ServiceFactory.createElementTemplates())
                .constant('IVariableRepository', variableRepository)
                .controller('FesController', Honeydew.ControllerFactory.createFesController())
                .directive('fesElement', Honeydew.DirectiveFactory.createFesElement())
                .directive('fesInit', Honeydew.DirectiveFactory.createFesInit())
                .directive('bindAttributes', Honeydew.DirectiveFactory.createBindAttributes())
                .directive('inlineTemplate', Honeydew.DirectiveFactory.createInlineTemplate());
        }
    }
}

Honeydew.Module.main(angular);
