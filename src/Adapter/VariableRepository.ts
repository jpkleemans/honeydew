/// <reference path="../Adapter/VariableCache.ts" />

declare var json;
declare class FormulaBootstrap
{
    constructor(var1, var2);
}

declare class CalculationModel
{
    constructor(var1);
}

declare class CalculationDocument
{
    constructor(var1);
}

module Honeydew
{
    export class VariableRepository implements Fes.IVariableRepository
    {
        private v05Instance:any;
        private userFormulas:any;
        private importData:any;
        private v05layout:any;
        private cache:VariableCache;

        constructor(v05Instance:any, userFormulas:any, importData:any, v05layout:any)
        {
            this.v05Instance = v05Instance;
            this.userFormulas = userFormulas;
            this.importData = importData;
            this.v05layout = v05layout;
            this.cache = new VariableCache();
        }

        findByKey(key:string):Fes.IVariable
        {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }

            var engine = {
                maxChildVariables: 600,
                modelBuilder: new FormulaBootstrap(this.v05Instance, this.userFormulas),
                activeModel: new CalculationModel(this.v05Instance),
                calcDocument: new CalculationDocument(this.importData),
                layout: this.v05layout
            };

            if (engine.activeModel[key] === undefined) {
                throw new RangeError("This variable does not exist");
            }

            var variable = new Variable(key, engine, this);
            this.cache.add(variable);
            return variable;
        }

        updateAll()
        {
            var allvariables = this.cache.all();
            for (var variable in allvariables) {
                if (allvariables.hasOwnProperty(variable)) {
                    variable.update();
                }
            }
        }
    }
}
