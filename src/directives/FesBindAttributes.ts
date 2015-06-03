/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class FesBindAttributes
    {
        /**
         * Modify the DOM
         */
        public compile;

        /**
         * FES VariableRepository
         */
        private variables:Fes.IVariableRepository;

        /**
         * VariableInitializer
         */
        private variableInitializer:VariableInitializer;

        /**
         * Instantiate FesBindAttributes directive
         *
         * @param $compile
         * @param variables
         * @param variableInitializer
         */
        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository, variableInitializer:VariableInitializer)
        {
            this.variables = variables;
            this.variableInitializer = variableInitializer;

            this.compile = () =>
            {
                return {
                    post: (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
                    {
                        var key = attrs['fesBindAttributes'];

                        if (scope[key] === undefined) {
                            this.variableInitializer.init(key, scope);
                        }

                        var type; // TODO: ugly!!!
                        if (scope[key].variable === undefined) {
                            type = scope[key].context;
                        } else {
                            type = scope[key].variable;
                        }

                        this.setObservers(type, key, scope);
                        this.setAttributes(key, scope[key].attributes, element);

                        element.removeAttr('fes-bind-attributes');
                        $compile(element)(scope);
                    }
                };
            }
        }

        /**
         * Set observers for variable on scope
         *
         * @param variable
         * @param key
         * @param scope
         */
        private setObservers(variable:Fes.IVariable, key:string, scope:angular.IScope)
        {
            variable.observe('change:attributes', (newAttrs) =>
            {
                console.log(newAttrs);
            });

            scope.$watch(key + '.attributes', function (newAttrs)
            {
                variable.setAttributes(newAttrs);
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
