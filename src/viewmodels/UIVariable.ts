module Honeydew
{
    export class UIVariable
    {
        public key:string;
        public title:string;
        public children:any;
        public attributes:any;

        constructor(key:string, title:string, children:any, attributes:any = {})
        {
            this.key = key;
            this.title = title;
            this.attributes = attributes;
            this.children = children;
        }
    }
}
