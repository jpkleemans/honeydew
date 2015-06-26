module Honeydew
{
    export class Cache<T>
    {
        private items:any;

        constructor()
        {
            this.items = {};
        }

        add(key:string, item:T)
        {
            this.items[key] = item;
        }

        get(key:string)
        {
            return this.items[key];
        }

        has(key:string)
        {
            return (typeof this.items[key] !== "undefined");
        }

        all()
        {
            return this.items;
        }
    }
}
