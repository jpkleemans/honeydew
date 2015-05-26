declare module Fes
{
    /**
     *
     */
    interface IAttributes
    {
        /**
         * Set HTML attribute(s)
         *
         * @param attributes
         */
        setAttributes(attributes:any):void;

        /**
         * Get HTML attributes
         *
         * @returns {any}
         */
        getAttributes():any;
    }

    /**
     *
     */
    interface IObservable
    {
        /**
         * Register for an event
         *
         * @param event
         * @param callback
         */
        observe(event:string, callback:Function):void;
    }

    /**
     *
     */
    interface IContext extends IAttributes, IObservable
    {
        /**
         * Get the reference key
         *
         * @returns {string}
         */
        getKey():string;

        /**
         * Get the title
         *
         * @returns {string}
         */
        getTitle():string;
    }

    /**
     *
     */
    interface IVariable extends IAttributes, IObservable
    {
        /**
         * Get the reference key
         *
         * @returns {string}
         */
        getKey():string;

        /**
         * Get the title
         *
         * @returns {string}
         */
        getTitle():string;

        /**
         * Get children
         *
         * @returns {Array<IVariable>}
         */
        getChildren():Array<IVariable>;

        /**
         * Get columns
         *
         * @returns {Array<IContext>}
         */
        getContext(query:any):Array<IContext>;
    }

    /**
     *
     */
    interface IVariableRepository
    {
        /**
         * Find a variable by its key
         *
         * @param key
         * @returns {IVariable}
         */
        findByKey(key:string): IVariable;
    }
}
