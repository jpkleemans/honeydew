/// <reference path="../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class FesInit
    {
        private variables:Fes.IVariableRepository;

        constructor(variables:Fes.IVariableRepository)
        {
            this.variables = variables;
        }

        /**
         *
         * @param scope
         * @param element
         * @param attrs
         */
        public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes):void
        {
            var variableKey:string = attrs['fes-init'];
            var variable:Fes.IVariable = this.variables.findByKey(variableKey);

            scope['variable'] = this.getUIVariable(variable);
        }

        /**
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        private getUIVariable(variable:Fes.IVariable):UIVariable
        {
            var key:string = variable.getKey();
            var title:string = variable.getTitle();

            var UIVariable:Honeydew.UIVariable = new Honeydew.UIVariable(key, title);

            return UIVariable;
        }
    }
}
