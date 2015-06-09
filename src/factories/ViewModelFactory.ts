module Honeydew
{
    export class ViewModelFactory
    {
        /**
         * Create UIVariable from IVariable
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        public createUIVariable(variable:Fes.IVariable):UIVariable
        {
            var key = variable.getKey();
            var title = variable.getTitle();
            var attributes = variable.getAttributes();

            var uiVariable = new UIVariable(variable, key, title, attributes);

            return uiVariable;
        }

        /**
         * Create UIContext from IContext
         *
         * @param context
         * @returns {Honeydew.UIContext}
         */
        public createUIContext(context:Fes.IContext):UIContext
        {
            //var key = variable.getKey();
            //var title = variable.getTitle();
            var attributes = context.getAttributes();

            var uiContext = new UIContext(context, attributes);

            return uiContext;
        }

        public createUIChildren(children:Array<Fes.IVariable>)
        {
            var uiChildren = [];
            var i = children.length;
            while (i--) {
                var uiChild = this.createUIVariable(children[i]);
                uiChildren.push(uiChild);
            }

            return uiChildren;
        }

        public createUIContexts(contexts:Array<Fes.IContext>)
        {
            var uiContexts = [];
            var i = contexts.length;
            while (i--) {
                var uiContext = this.createUIContext(contexts[i]);
                uiContexts.push(uiContext);
            }

            return uiContexts;
        }
    }
}
