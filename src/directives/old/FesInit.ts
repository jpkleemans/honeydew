/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class FesInit
    {
        private variables:Fes.IVariableRepository;
        public link;

        constructor(variables:Fes.IVariableRepository)
        {
            this.variables = variables;

            this.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes)=>
            {
                var variableKey:string = attrs['fesInit'];
                var variable:Fes.IVariable = this.variables.findByKey(variableKey);

                scope[variableKey] = this.getUIVariable(variable);
            }
        }

        private getUIVariable(variable:Fes.IVariable):UIVariable
        {
            var key:string = variable.getKey();
            var title:string = variable.getTitle();
            var children:any = variable.getChildren();
            var UIVariable:Honeydew.UIVariable = new Honeydew.UIVariable(key, title, children);

            return UIVariable;
        }
    }
}
