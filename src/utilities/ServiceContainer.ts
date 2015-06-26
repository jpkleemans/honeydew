module Honeydew
{
    export class ServiceContainer
    {
        private values:any;

        constructor()
        {
            this.values = {};
        }

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

        get(key:string)
        {
            if (typeof this.values[key] === 'undefined') {
                throw new Error('Service does not exist');
            }

            return this.values[key](this);
        }

        has(key:string)
        {
            return (typeof this.values[key] !== "undefined");
        }

        remove(key:string)
        {
            delete this.values[key];
        }
    }
}
