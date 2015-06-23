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
    interface IContext extends IAttributes, IUpdatable {
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
    }
}
declare module Fes {
    interface IUpdatable {
        /**
         * Update HTML attributes
         *
         * @returns {void}
         */
        update(): void;
    }
}
declare module Fes {
    interface IVariable extends IAttributes, IUpdatable {
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
    }
}
