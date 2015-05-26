/// <reference path="../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class VariableRepository
    {
        private variables:Fes.IVariableRepository;

        constructor(variables:Fes.IVariableRepository)
        {
            this.variables = variables;
        }

        public findByKey(key:string, includeChildren:boolean = false)
        {
            var variable:Fes.IVariable = this.variables.findByKey(key);

            var result:Variable = new Variable(key);

            result.attributes = variable.getAttributes();

            if (includeChildren) {
                result.children = variable.getChildren();
            }

            return result;
        }
    }
}
