declare module Fes {
    interface IContext {
        /**
         * Get or set HTML attributes
         *
         * @param attributes
         * @returns {any}
         */
        attributes(attributes?: any): any;
        /**
         * Get HTML display type
         *
         * @returns {string}
         */
        displayType(): string;
    }
}
declare module Fes {
    interface IContextRepository {
        /**
         * Find contexts by query
         *
         * @param key
         * @returns {IVariable}
         */
        where(query: string): Array<IContext>;
        /**
         * Find the first context
         *
         * @returns {IContext}
         */
        first(): IContext;
    }
}
declare module Fes {
    interface IVariable {
        /**
         * Get reference key
         *
         * @returns {string}
         */
        key(): string;
        /**
         * Get or set HTML attributes
         *
         * @param attributes
         * @returns {any}
         */
        attributes(attributes?: any): any;
        /**
         * Get HTML display type
         *
         * @returns {string}
         */
        displayType(): string;
        /**
         * Get children
         *
         * @returns {Array<IVariable>}
         */
        children(): Array<IVariable>;
        /**
         * Check if variable has children
         *
         * @returns {boolean}
         */
        hasChildren(): boolean;
        /**
         * Get contexts
         *
         * @param query
         * @returns {Array<IContext>}
         */
        contexts(query: any): Array<IContext>;
    }
}
declare module Fes {
    interface IVariableRepository {
        /**
         * Find a variable by its key
         *
         * @param key
         * @returns {IVariable}
         */
        find(key: string): IVariable;
        /**
         * Find multiple variables by their keys
         *
         * @param keys
         * @returns {Arrray<IVariable>}
         */
        findRange(keys: Array<string>): Array<IVariable>;
    }
}
