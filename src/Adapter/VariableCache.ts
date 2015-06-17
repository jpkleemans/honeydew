module Honeydew
{
    export class VariableCache
    {
        private variables: any;

        add(variable: Fes.IVariable)
        {
            this.variables[variable.key()] = variable;
        }

        get(key:string)
        {
            return this.variables[key];
        }

        has (key:string)
        {
            return (typeof this.variables[key] !== "undefined");
        }

        all()
        {
            return this.variables;
        }
    }
}