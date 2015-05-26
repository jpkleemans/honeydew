/// <reference path="../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class FesBind
    {
        private $compile:angular.ICompileService;
        private variables:VariableRepository;

        constructor($compile:angular.ICompileService, variables:VariableRepository)
        {
            this.$compile = $compile;
            this.variables = variables;
        }

        public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes)
        {
            var key:string = attrs['fes-bind'];
            var contextQuery:any = attrs['fes-bind-context'];

            var variable:Variable = this.variables.findByKey(key);
            var context:Fes.IContext = variable.getContext(contextQuery);

            scope['variable'] = variable;

            // set observers to watch for model and user changes
            this.setObservers();

            // set attributes from variable on element
            this.setAttributes(variable.attributes, element);

            element.removeAttr('fes-bind');
            this.$compile(element)(scope);
        }

        private setObservers(scope:angular.IScope, variable:Fes.IVariable)
        {
            // Listen for user changes
            scope.$watch(variable.key, function (newAttrs)
            {
                variable.setAttributes(column, newAttrs);
            }, true);

            // Listen for model changes
            variable.observe(function (newAttrs)
            {
                var newAttrs = variable.getAttributes(column); // Moet uiteindelijk meegegeven worden als argument vd callback

                if (scope[variable.key] !== newAttrs) {
                    scope[variable.key] = newAttrs;
                }
            });
        }

        private setAttributes(attrs:any, element:angular.IAugmentedJQuery)
        {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.attr('ng-attr-' + attr, '{{variable.attributes.' + attr + '}}');
                }
            }

            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', 'variable.attributes.value');
        }
    }
}
