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
                        var key = attrs['bindAttributes'];
                        var attributes = scope.$eval(key);

                        this.setAttributes(key, attributes, element);

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
        private setAttributes(key:string, attributes:any, element:angular.IAugmentedJQuery):void
        {
            for (var attr in attributes) {
                if (attributes.hasOwnProperty(attr)) {
                    if (String.contains(attr, 'ng-')) {
                        element.attr(attr, attributes[attr]);
                    } else {
                        if (attr === 'value') {
                            element.attr('ng-model', key + '.value');
                        } else {
                            var directive = 'ng' + String.ucfirst(attr) + 'Directive';
                            if (this.$injector.has(directive)) {
                                element.attr('ng-' + attr, key + '.' + attr);
                            } else {
                                element.attr('ng-attr-' + attr, '{{' + key + '.' + attr + '}}');
                            }
                        }
                    }
                }
            }
        }
    }
}
