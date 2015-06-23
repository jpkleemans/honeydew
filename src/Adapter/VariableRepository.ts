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

            if (variableModel === undefined) {
                variableModel = this.calculationModel["Q_MAP02_VALIDATION"];
                //throw new RangeError("This variable does not exist");
            }

            var childrenKeys = [];
            if (this.v05layout[key] !== undefined) {
                childrenKeys = this.v05layout[key].children;
            }

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
                // if (allvariables.hasOwnProperty(variable)) {
                variable.update();
                // }
            }
        }
    }
}
