declare module Fes {
    interface IAttributes {
        /**
         * HTML attributes
         *
         * @param attributes
         * @returns {any}
         */
        attributes(attributes?: any): any;
    }
}
declare module Fes {
    interface IContext extends IAttributes {
        /**
         * Reference key
         *
         * @returns {string}
         */
        key(): string;
        /**
         * Title
         *
         * @returns {string}
         */
        title(): string;

        update();
    }
}
declare module Fes {
    interface IVariable extends IAttributes {
        /**
         * Reference key
         *
         * @returns {string}
         */
        key(): string;
        /**
         * Title
         *
         * @returns {string}
         */
        title(): string;
        /**
         * Children
         *
         * @returns {Array<IVariable>}
         */
        children(): Array<IVariable>;
        /**
         * All possible contexts
         *
         * @param query
         * @returns {Array<IContext>}
         */
        contexts(query: any): Array<IContext>;

        update();
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
        findByKey(key: string): IVariable;

        updateAll();
    }
}
