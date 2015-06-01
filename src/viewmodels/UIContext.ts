module Honeydew
{
    export class UIContext
    {
        public context:Fes.IContext;
        public attributes:any;

        constructor(context:Fes.IContext,
                    attributes:any)
        {
            this.context = context;
            this.attributes = attributes;
        }
    }
}
