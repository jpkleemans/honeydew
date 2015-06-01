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
         * VariableInitializer
         */
        private variableInitializer:VariableInitializer;

        /**
         * Instantiate FesBindAttributes directive
         *
         * @param $compile
         * @param variableInitializer
         */
        constructor($compile:angular.ICompileService, variableInitializer:VariableInitializer)
        {
            this.variableInitializer = variableInitializer;

            this.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
            {
                var key = attrs['fesBindAttributes'];

                if (scope[key] === undefined) {
                    this.variableInitializer.init(key, scope);
                }

                this.setObservers(key, scope);
                this.setAttributes(key, scope[key].attributes, element);

                element.removeAttr('fes-bind-attributes');
                $compile(element)(scope);
            }
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
