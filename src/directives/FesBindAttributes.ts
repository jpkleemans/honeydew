/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class FesBindAttributes
    {
        /**
         * Modify the DOM
         */
        public link;

        /**
         * FES VariableRepository
         */
        private variables:Fes.IVariableRepository;

        /**
         * Instantiate FesBindAttributes directive
         *
         * @param $compile
         * @param variables
         */
        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository)
        {
            this.variables = variables;

            this.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
            {
                var key = attrs['fesBindAttributes'];

                if (scope[key] === undefined) {
                    this.initVariable(key, scope);
                }

                this.setObservers(key, scope);
                this.setAttributes(key, scope[key].attributes, element);

                element.removeAttr('fes-bind-attributes');
                $compile(element)(scope);
            }
        }

        /**
         * Init a variable on a scope
         *
         * @param key
         * @param scope
         */
        private initVariable(key:string, scope:angular.IScope)
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

        /**
         * Set observers for variable on scope
         *
         * @param key
         * @param scope
         */
        private setObservers(key:string, scope:angular.IScope)
        {
            scope[key].observe('change:attributes', (newValue) =>
            {
                console.log(newValue);
            });

            scope.$watch(key + '.attributes', function (newAttrs)
            {
                scope[key].setAttributes(newAttrs);
            }, true);
        }

        /**
         * Set attributes on element
         *
         * @param key
         * @param attributes
         * @param element
         */
        private setAttributes(key:string, attributes:any, element:angular.IAugmentedJQuery):void
        {
            for (var attr in attributes) {
                if (attributes.hasOwnProperty(attr)) {
                    element.attr('ng-attr-' + attr, '{{' + key + '.attributes.' + attr + '}}');
                }
            }

            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', key + '.attributes.value');
        }
    }
}
