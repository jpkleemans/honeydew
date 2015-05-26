/// <reference path="../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class FesBind
    {
        private $compile:angular.ICompileService;
        private variables:Fes.IVariableRepository;

        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository)
        {
            this.$compile = $compile;
            this.variables = variables;
        }

        /**
         *
         * @param scope
         * @param element
         * @param attrs
         */
        public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes):void
        {
            var variableKey:string = attrs['fes-bind'];
            var variable:Fes.IVariable = this.variables.findByKey(variableKey);
            var UIVariable:UIVariable = this.getUIVariable(variable);
            scope['variable'] = UIVariable;

            var contextQuery:any = attrs['fes-bind-context'];
            var context:Fes.IContext = variable.getContext(contextQuery);
            var UIContext:UIContext = this.getUIContext(context);
            scope['context'] = UIContext;

            // set observers to watch for model and user changes of attributes
            this.setAttributeObservers(scope, context);

            // set attributes from context on element
            this.setAttributes(UIContext.attributes, element);

            element.removeAttr('fes-bind');
            this.$compile(element)(scope);
        }

        /**
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        private getUIVariable(variable:Fes.IVariable):UIVariable
        {
            var key:string = variable.getKey();
            var title:string = variable.getTitle();

            var UIVariable:Honeydew.UIVariable = new Honeydew.UIVariable(key, title);

            return UIVariable;
        }

        /**
         *
         * @param context
         * @returns {Honeydew.UIContext}
         */
        private getUIContext(context:Fes.IContext):UIContext
        {
            var attributes:any = context.getAttributes();

            var UIContext:Honeydew.UIContext = new Honeydew.UIContext(attributes);

            return UIContext;
        }

        /**
         *
         * @param scope
         * @param context
         */
        private setAttributeObservers(scope:angular.IScope, context:Fes.IContext):void
        {
            // Listen for user changes
            scope.$watch('context.attributes', function (newAttrs)
            {
                context.setAttributes(newAttrs);
            }, true);

            // Listen for model changes
            context.observe('change:attributes', function (newAttrs)
            {
                if (scope['context'].attributes !== newAttrs) {
                    scope['context'].attributes = newAttrs;
                }
            });
        }

        /**
         *
         * @param attrs
         * @param element
         */
        private setAttributes(attrs:any, element:angular.IAugmentedJQuery):void
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
