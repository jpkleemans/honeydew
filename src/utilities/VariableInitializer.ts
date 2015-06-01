/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

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
            var variable = this.variables.findByKey(key);
            scope[key] = this.createUIVariable(variable);
        }

        /**
         * Create UIVariable from IVariable
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        private createUIVariable(variable:Fes.IVariable):UIVariable
        {
            var key = variable.getKey();
            var title = variable.getTitle();
            var attributes = variable.getAttributes();

            var uiVariable = new UIVariable(key, title, attributes);

            return uiVariable;
        }
    }
}
