/// <reference path="../utilities/Cache.ts" />

module Honeydew
{
    export class VariableRepository implements Fes.IVariableRepository
    {
        private layout:any;
        private contextRepo:ContextRepository;
        private cache:Cache<Fes.IVariable>;
        private calculationModel;

        constructor(layout:any, contextRepo:ContextRepository, calculationModel)
        {
            this.layout = layout;
            this.contextRepo = contextRepo;
            this.cache = new Cache<Fes.IVariable>();
            this.calculationModel = calculationModel;
        }

        find(key:string):Fes.IVariable
        {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }

            var variableModel = this.calculationModel[key];

            if (variableModel === undefined) {
                throw new RangeError("This variable does not exist");
            }

            var childrenKeys = [];
            if (this.layout[key] !== undefined) {
                childrenKeys = Object.keys(this.layout[key]);
            }

            var variable = new Variable(key, childrenKeys, this, this.contextRepo, variableModel);

            this.cache.add(key, variable);
            return variable;
        }

        findRange(keys:Array<string>)
        {
            var children = [];

            var i;
            var length = keys.length;
            for (i = 0; i < length; i++) {
                var childKey = keys[i];
                var childVariable = this.find(childKey);
                children.push(childVariable);
            }

            return children;
        }

        updateAll()
        {
            var allvariables = this.cache.all();
            for (var variable in allvariables) {
                variable.update();
            }
        }
    }
}
