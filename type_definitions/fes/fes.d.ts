declare module Fes {
    interface IAttributes {
        /**
         * HTML attributes
         */
        attributes: any;
        /**
         * Set HTML attribute(s)
         *
         * @param attributes
         */
        setAttributes(attributes: any): void;
    }
}
declare module Fes {
    interface IContext extends IAttributes {
        /**
         * Reference key
         */
        key: string;
        /**
         * Title
         */
        title: string;
    }
}
declare module Fes {
    interface IVariable extends IAttributes {
        /**
         * Reference key
         */
        key: string;
        /**
         * Title
         */
        title: string;
        /**
         * Children
         */
        children: Array<IVariable>;
        /**
         * All possible contexts
         */
        contexts: Array<IContext>;
        /**
         * Initialize children property
         */
        initChildren(): void;
        /**
         * Initialize contexts property
         *
         * @param query
         */
        initContexts(query: any): void;
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
    }
}
