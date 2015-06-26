/// <reference path="../utilities/Cache.ts" />

module Honeydew
{
    export class VariableRepository implements IVariableRepository
    {
        private layout:any;
        private contextRepo:ContextRepository;
        private cache:Cache<IVariable>;
        private calculationModel;

        constructor(layout:any, contextRepo:ContextRepository, cache:Cache<IVariable>, calculationModel)
        {
            this.layout = layout;
            this.contextRepo = contextRepo;
            this.cache = cache;
            this.calculationModel = calculationModel;
        }

        find(key:string):IVariable
        {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }

            var variableModel = this.calculationModel[key];

            if (variableModel === undefined) {
                // TODO: throw new RangeError("This variable does not exist");
                variableModel = this.calculationModel["Q_MAP02_VALIDATION"];
            }

            var childrenKeys = [];
            if (this.layout[key] !== undefined) {
                childrenKeys = this.layout[key].children;
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
    }
}
