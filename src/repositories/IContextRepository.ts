module Honeydew
{
    export interface IContextRepository
    {
        /**
         * Find contexts by query
         *
         * @param key
         * @returns {IVariable}
         */
        where(query:string) : Array<IContext>;

        /**
         * Find the first context
         *
         * @returns {IContext}
         */
        first() : IContext;
    }
}
