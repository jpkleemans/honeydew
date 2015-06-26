module Honeydew
{
    export interface IVariableRepository
    {
        /**
         * Find a variable by its key
         *
         * @param key
         * @returns {IVariable}
         */
        find(key:string) : IVariable;

        /**
         * Find multiple variables by their keys
         *
         * @param keys
         * @returns {Arrray<IVariable>}
         */
        findRange(keys:Array<string>) : Array<IVariable>
    }
}
