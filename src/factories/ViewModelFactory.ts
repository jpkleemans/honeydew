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

        public createUIVariables(variables:Array<Fes.IVariable>)
        {
            var uiVariables = [];
            var i = variables.length;
            while (i--) {
                var uiChild = this.createUIVariable(variables[i]);
                uiVariables.push(uiChild);
            }

            return uiVariables;
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
