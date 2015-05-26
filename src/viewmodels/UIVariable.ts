module Honeydew
{
    export class UIVariable
    {
        public key:string;
        public title:string;
        public children:Array<UIVariable>;

        constructor(key:string, title:string, children:Array<UIVariable> = [])
        {
            this.key = key;
            this.title = title;
            this.children = children;
        }
    }
}
