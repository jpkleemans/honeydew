/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class FesBindAttributes
    {
        private $compile:angular.ICompileService;
        public link;
        private variables;
        public scope = {};
        public terminal = true;

        constructor($compile:angular.ICompileService, variables:Fes.IVariableRepository)
        {
            this.$compile = $compile;
            this.variables = variables;

            this.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
            {
                var variableKey:string = attrs['fesBindAttributes'];
                var variable:any = this.variables.findByKey(variableKey);
                scope[variableKey] = this.getUIVariable(variable);
                if (scope[variableKey] === undefined) {
                    throw new Error('Variable ' + variableKey + ' not initialized');
                }


                /*
                 variable.observe('change:attributes', (newValue) =>
                 {
                 console.log(newValue);
                 });

                 scope.$watch(variableKey + '.attributes', function (newAttrs)
                 {
                 variable.setAttributes(newAttrs);
                 }, true);

                 //var variableKey:string = attrs['fesBindAttributes'];

                 */
                var attributes:any = scope[variableKey].attributes;


                this.setAttributes(variableKey, attributes, element);

                element.removeAttr('fes-bind-attributes');
                this.$compile(element)(scope);


            };
        }

        ///**
        // *
        // * @param scope
        // * @param element
        // * @param attrs
        // */
        //public link(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes):void
        //{
        //
        //}

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

        /**
         *
         * @param variable
         * @returns {Honeydew.UIVariable}
         */
        private getUIVariable(variable:any):UIVariable
        {
            var key:string = variable.getKey();
            var title:string = variable.getTitle();
            var attributes:string = variable.getAttributes();
            var children:any = [];
            var i = variable.getChildren().length;
            while (i--) {
                children.push(this.getUIVariable(variable.getChildren()[i]));
            }
            var UIVariable:Honeydew.UIVariable = new Honeydew.UIVariable(key, title, children, attributes);

            return UIVariable;
        }
    }
}
