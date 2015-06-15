/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class BindAttributes
    {
        /**
         * Modify the DOM
         */
        public compile;

        /**
         * Angular $injector
         */
        private $injector:angular.auto.IInjectorService;

        /**
         * Instantiate FesBindAttributes directive
         *
         * @param $compile
         * @param variables
         */
        constructor($compile:angular.ICompileService, $injector:angular.auto.IInjectorService)
        {
            this.$injector = $injector;

            this.compile = () =>
            {
                return {
                    post: (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
                    {
                        var attributes = attrs['bindAttributes'];

                        this.setAttributes(attributes, element);

                        element.removeAttr('bind-attributes');
                        $compile(element)(scope);
                    }
                };
            }
        }

        /**
         * Set attributes on element
         *
         * @param attributes
         * @param element
         */
        private setAttributes(attributes:any, element:angular.IAugmentedJQuery):void
        {
            for (var attr in attributes) {
                if (attributes.hasOwnProperty(attr)) {
                    if (String.contains(attr, 'ng-')) {
                        element.attr(attr, attributes[attr]);
                    } else {
                        var directive = 'ng' + String.ucfirst(attr) + 'Directive';
                        if (this.$injector.has(directive)) {
                            element.attr('ng-' + attr, attr);
                        } else {
                            element.attr('ng-attr-' + attr, '{{' + attr + '}}');
                        }
                    }
                }
            }

            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', 'value');
        }
    }
}
