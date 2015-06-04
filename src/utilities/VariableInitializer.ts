/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class VariableInitializer
    {
        /**
         * FES VariableRepository
         */
        private variables:Fes.IVariableRepository;

        /**
         * Instantiate FesRepeat directive
         *
         * @param variables
         */
        constructor(variables:Fes.IVariableRepository)
        {
            this.variables = variables;
        }

        /**
         * Init a variable on a scope
         *
         * @param key
         * @param scope
         */
        public init(key:string, scope:angular.IScope)
        {
            var variable = this.variables.findByKey(key, scope);
            scope[key] = this.createUIVariable(variable);
        }

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
