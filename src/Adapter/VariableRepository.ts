/// <reference path="VariableCache.ts" />

module Honeydew
{
    export class VariableRepository implements Fes.IVariableRepository
    {
        private v05layout:any;
        private contextRepo:ContextRepository;
        private cache:VariableCache;
        private calculationModel;

        constructor(v05layout:any, contextRepo:ContextRepository, calculationModel)
        {
            this.v05layout = v05layout;
            this.contextRepo = contextRepo;
            this.cache = new VariableCache();
            this.calculationModel = calculationModel;
        }

        findByKey(key:string):Fes.IVariable
        {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }

            var variableModel = this.calculationModel[key];

            //if (variableModel === undefined) {
            //    throw new RangeError("This variable does not exist");
            //}

            var childrenKeys = this.v05layout[key];

            var variable = new Variable(key, childrenKeys, this, this.contextRepo, variableModel);

            this.cache.add(variable);
            return variable;
        }

        findRangeByKeys(keys:Array<string>)
        {
            // TODO: to remove for-loop from Variable::children()
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
