module Honeydew
{
    export class UIVariable
    {
        public key:string;
        public title:string;
        public children:Array<UIVariable>;
        public attributes:any;

        constructor(key:string, title:string, attributes:any = {}, children:Array<UIVariable> = [])
        {
            this.key = key;
            this.title = title;
            this.attributes = attributes;
            this.children = children;
        }
    }
}
