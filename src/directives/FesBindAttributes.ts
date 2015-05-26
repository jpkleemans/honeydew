/// <reference path="../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class FesBindAttributes
    {
        private $compile:angular.ICompileService;
        //public link;

        constructor($compile:angular.ICompileService)
        {
            this.$compile = $compile;

            //this.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
            //{
            //    var variableKey:string = attrs['fesBindAttributes'];
            //
            //    if (scope[variableKey] === undefined) {
            //        throw new Error('Variable ' + variableKey + ' not initialized');
            //    }
            //
            //    var attributes:any = scope[variableKey].attributes;
            //
            //    this.setAttributes(variableKey, attributes, element);
            //
            //    element.removeAttr('fes-bind-attributes');
            //    this.$compile(element)(scope);
            //};
        }

        /**
        *
        * @param scope
        * @param element
        * @param attrs
        */
        public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes):void
        {
            var variableKey:string = attrs['fesBindAttributes'];

            if (scope[variableKey] === undefined) {
                throw new Error('Variable ' + variableKey + ' not initialized');
            }

            var attributes:any = scope[variableKey].attributes;

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
