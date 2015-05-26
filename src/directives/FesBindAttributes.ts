/// <reference path="../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class FesInit
    {
        private $compile:angular.ICompileService;

        constructor($compile:angular.ICompileService)
        {
            this.$compile = $compile;
        }

        /**
         *
         * @param scope
         * @param element
         * @param attrs
         */
        public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes):void
        {
            var variableKey:string = attrs['fes-bind-attributes'];

            if (scope[variableKey] === undefined) {
                throw new Error('Variable ' + variableKey + ' not initialized');
            }

            var attributes = scope[variableKey].attributes;

            this.setAttributes(variableKey, attributes, element);

            element.removeAttr('fes-bind-attributes');
            this.$compile(element)(scope);
        }

        /**
         *
         * @param attrs
         * @param element
         */
        private setAttributes(variableKey:string, attrs:any, element:angular.IAugmentedJQuery):void
        {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.attr('ng-attr-' + attr, '{{' + variableKey + '.attributes.' + attr + '}}');
                }
            }

            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', variableKey + '.attributes.value');
        }
    }
}
