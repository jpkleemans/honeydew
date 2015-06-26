module Honeydew
{
    export interface IVariable
    {
        /**
         * Get reference key
         *
         * @returns {string}
         */
        key() : string;

        /**
         * Get or set HTML attributes
         *
         * @param attributes
         * @returns {any}
         */
        attributes(attributes?:any) : any;

        /**
         * Get HTML display type
         *
         * @returns {string}
         */
        displayType() : string;

        /**
         * Get children
         *
         * @returns {Array<IVariable>}
         */
        children() : Array<IVariable>;

        /**
         * Check if variable has children
         *
         * @returns {boolean}
         */
        hasChildren() : boolean;

        /**
         * Get contexts
         *
         * @param query
         * @returns {Array<IContext>}
         */
        contexts(query:any) : Array<IContext>;
    }
}
