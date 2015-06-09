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
        private viewModelFactory:ViewModelFactory;

        /**
         * Angular $injector
         */
        private $injector:angular.auto.IInjectorService;

        /**
         * Instantiate FesBindAttributes directive
         *
         * @param $compile
         * @param variables
         * @param variableInitializer
         */
        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository, viewModelFactory:ViewModelFactory, $injector:angular.auto.IInjectorService)
        {
            this.variables = variables;
            this.viewModelFactory = viewModelFactory;
            this.$injector = $injector;

            this.compile = () =>
            {
                return {
                    post: (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
                    {
                        var key = attrs['fesBindAttributes'];

                        if (scope[key] === undefined) {
                            var variable = this.variables.findByKey(key, scope);
                            scope[key] = this.viewModelFactory.createUIVariable(variable);
                        }

                        var entity; // TODO: ugly!!!
                        if (scope[key].variable === undefined) {
                            entity = scope[key].context;
                        } else {
                            entity = scope[key].variable;
                        }
                        this.setObservers(entity, key, scope);

                        this.setAttributes(key, scope[key].attributes, element);

                        element.removeAttr('fes-bind-attributes');
                        $compile(element)(scope);
                    }
                };
            }
        }

        /**
         * Set observers for entity on scope
         *
         * @param entity
         * @param key
         * @param scope
         */
        private setObservers(entity, key:string, scope:angular.IScope)
        {
            entity.observe('change:attributes', (newAttrs) =>
            {
                //console.log("change:attributes fired for: " + key + " contents: " + newAttrs);
                scope[key].attributes = entity.getAttributes();
            });

            scope.$watch(key + '.attributes', function (newAttrs)
            {
                entity.setAttributes(newAttrs);
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
                    var directive = 'ng' + String.ucfirst(attr) + 'Directive';
                    if (this.$injector.has(directive)) {
                        element.attr('ng-' + attr, key + '.attributes.' + attr);
                    } else {
                        element.attr('ng-attr-' + attr, '{{' + key + '.attributes.' + attr + '}}');
                    }
                }
            }

            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', key + '.attributes.value');
        }
    }
}
