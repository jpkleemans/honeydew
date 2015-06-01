module Honeydew
{
    export class UIVariable
    {
        public variable:Fes.IVariable;
        public key:string;
        public title:string;
        public attributes:any;
        public children:Array<UIVariable>;
        public contexts:Array<UIContext>;

        constructor(variable:Fes.IVariable,
                    key:string,
                    title:string,
                    attributes:any = {},
                    children:Array<UIVariable> = [],
                    contexts:Array<UIContext> = [])
        {
            this.variable = variable;
            this.key = key;
            this.title = title;
            this.attributes = attributes;
            this.children = children;
            this.contexts = contexts;
        }
    }
}
