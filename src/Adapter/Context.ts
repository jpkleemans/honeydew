module Honeydew
{
    export class Context implements Fes.IContext
    {
        private key: string;
        private title: string;
        private attributes: any;

        key():string
        {
            return this.key;
        }

        title():string
        {
            return this.title;
        }

        attributes():any
        {
            return undefined;
        }

    }
}