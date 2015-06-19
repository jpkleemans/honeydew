declare class CalculationModel
{
    constructor(var1);
}

module Honeydew
{
    export class VariableRepository implements Fes.IVariableRepository
    {
        private v05instance:any;
        private v05layout:any;
        private contextRepo:ContextRepository;
        private cache:VariableCache;

        constructor(v05instance:any, v05layout:any, contextRepo:ContextRepository)
        {
            this.v05instance = v05instance;
            this.v05layout = v05layout;
            this.contextRepo = ContextRepository;
            this.cache = new VariableCache();
        }

        findByKey(key:string):Fes.IVariable
        {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }

            var calculationModel = new CalculationModel(this.v05instance);
            var activeModel = calculationModel[key];

            if (activeModel === undefined) {
                throw new RangeError("This variable does not exist");
            }

            var childrenKeys = this.v05layout[key];

            var variable = new Variable(key, childrenKeys, this, this.contextRepo, activeModel);

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
