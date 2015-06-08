declare module Fes {
    interface IAttributes {
        /**
         * Set HTML attribute(s)
         *
         * @param attributes
         */
        setAttributes(attributes: any): void;
        /**
         * Get HTML attributes
         *
         * @returns {any}
         */
        getAttributes(): any;
    }
}
declare module Fes {
    interface IObservable {
        /**
         * Register for an event
         *
         * @param event
         * @param callback
         */
        observe(event: string, callback: Function): void;
    }
}
declare module Fes {
    interface IContext extends IAttributes, IObservable {
        /**
         * Get the reference key
         *
         * @returns {string}
         */
        getKey(): string;
        /**
         * Get the title
         *
         * @returns {string}
         */
        getTitle(): string;
    }
}
declare module Fes {
    interface IVariable extends IAttributes, IObservable {
        /**
         * Get the reference key
         *
         * @returns {string}
         */
        getKey(): string;
        /**
         * Get the title
         *
         * @returns {string}
         */
        getTitle(): string;
        /**
         * Get children
         *
         * @returns {Array<IVariable>}
         */
        getChildren(): Array<IVariable>;
        /**
         * Set children
         *
         * @param children
         */
        setChildren(children: Array<IVariable>): void;
        /**
         * Get contexts
         *
         * @returns {Array<IContext>}
         */
        getContexts(query: any): Array<IContext>;
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
        findByKey(key: string, scope:angular.IScope): IVariable;
    }
}
