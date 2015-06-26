/// <reference path="../../src/factories/DirectiveFactory.ts" />
/// <reference path="../../src/factories/ControllerFactory.ts" />
/// <reference path="../../src/factories/ServiceFactory.ts" />
/// <reference path="../repositories/VariableRepository.ts" />
/// <reference path="../repositories/ContextRepository.ts" />
/// <reference path="../viewmodels/Context.ts" />
/// <reference path="../viewmodels/Variable.ts" />

declare var json;

// Onderstaande classes moeten in een typescript definition file komen
// e_full.d.ts o.i.d.
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
    export class RuntimeModule
    {
        constructor(container)
        {
            var v05Instance = json['v05instance'];
            var userFormulas = json['defaultmath'];
            var importData = json['v05baseimportinstance'];
            var v05layout = json['v05layout'];
            new FormulaBootstrap(v05Instance, userFormulas);

            container.singleton('CalculationModel', function (container)
            {
                return new CalculationModel(v05Instance);
            });

            container.singleton('CalculationDocument', function (container)
            {
                return new CalculationDocument(importData);
            });

            container.singleton('ContextRepository', function (container)
            {
                return new ContextRepository(
                    container.resolve('CalculationDocument'),
                    container.resolve('CalculationModel')
                );
            });

            container.singleton('VariableCache', function (container)
            {
                return new Cache<IVariable>();
            });

            container.singleton('VariableRepository', function (container)
            {
                return new VariableRepository(
                    v05layout,
                    container.resolve('ContextRepository'),
                    container.resolve('VariableCache'),
                    container.resolve('CalculationModel')
                );
            });
        }
    }
}


