module Honeydew
{
    export class Cache<T>
    {
        private items:any;

        constructor()
        {
            this.items = {};
        }

        /**
         * Add item to cache
         *
         * @param key
         * @param item
         */
        add(key:string, item:T)
        {
            this.items[key] = item;
        }

        /**
         * Get item from cache
         *
         * @param key
         * @returns {any}
         */
        get(key:string)
        {
            return this.items[key];
        }

        /**
         * Check if item exist in cache
         *
         * @param key
         * @returns {boolean}
         */
        has(key:string)
        {
            return (typeof this.items[key] !== "undefined");
        }

        /**
         * Get all items from cache
         *
         * @returns {any}
         */
        all()
        {
            return this.items;
        }

        /**
         * Remove item from cache
         *
         * @param key
         */
        remove(key:string)
        {
            delete this.items[key];
        }
    }
}
