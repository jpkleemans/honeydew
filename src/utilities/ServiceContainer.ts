module Honeydew
{
    export class ServiceContainer
    {
        private values:any;

        constructor()
        {
            this.values = {};
        }

        /**
         * Register a service as singleton
         *
         * @param key
         * @param callable
         */
        singleton(key:string, callable:Function)
        {
            var object;

            this.values[key] = function (container)
            {
                if (typeof object === 'undefined') {
                    object = callable(container);
                }

                return object;
            };
        }

        /**
         * Resolve service from container with dependencies
         *
         * @param key
         * @returns {any}
         */
        resolve(key:string)
        {
            if (typeof this.values[key] === 'undefined') {
                throw new Error('Service does not exist');
            }

            return this.values[key](this);
        }

        /**
         * Check if service exist
         *
         * @param key
         * @returns {boolean}
         */
        has(key:string)
        {
            return (typeof this.values[key] !== "undefined");
        }

        /**
         * Remove service from container
         *
         * @param key
         */
        remove(key:string)
        {
            delete this.values[key];
        }
    }
}
