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
         * Angular $injector
         */
        private $injector:angular.auto.IInjectorService;
        public priority:number = 999;
        /**
         * Instantiate FesBindAttributes directive
         *
         * @param $compile
         * @param variables
         */
        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository, $injector:angular.auto.IInjectorService)
        {
            this.variables = variables;
            this.$injector = $injector;

            this.compile = () =>
            {
                return {
                    post: (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
                    {
                        var key = attrs['fesBindAttributes'];

                        if (scope[key] === undefined) {
                            scope[key] = this.variables.findByKey(key);
                        }

                        this.setWatch(key, scope);
                        this.setAttributes(key, scope[key].attributes, element);
                        element.attr('variable-name', attrs['fesBindAttributes']);
                        element.removeAttr('fes-bind-attributes');
                        $compile(element)(scope);
                    }
                };
            }
        }

        /**
         * Set watch for user changes of attributes
         *
         * @param key
         * @param scope
         */
        private setWatch(key:string, scope:angular.IScope)
        {
            scope.$watch(key + '.attributes', function (newAttrs, oldAttrs)
            {
                if (angular.equals(oldAttrs, newAttrs) === false) {
                    //console.log('setAttributes called for: ' + scope[key].key);
                    scope[key].setAttributes(newAttrs);
                }
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
                    if (String.contains(attr, 'ng-')) {
                        element.attr(attr, attributes[attr]);
                    } else {
                        var directive = 'ng' + String.ucfirst(attr) + 'Directive';
                        if (this.$injector.has(directive)) {
                            element.attr('ng-' + attr, key + '.attributes.' + attr);
                        } else {
                            element.attr('ng-attr-' + attr, '{{' + key + '.attributes.' + attr + '}}');
                        }
                    }
                }
            }

            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', key + '.attributes.value');
        }
    }
}
