module Honeydew
{
    export interface IContext
    {
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
    }
}
