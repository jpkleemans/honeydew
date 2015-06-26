/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class FesElement
    {
        /**
         * Modify the DOM
         */
        public link;
        public replace = true;
        public templateUrl = '';
        public priority = 49;

        constructor(ElementTemplates:ElementTemplates)
        {
            this.link = (scope, element, attrs) =>
            {
                // Naam van de variable op de scope.
                var param = attrs['fesElement'];
                var scopeName = param.split('.')[0];
                var displaytype = scope.$eval(param);
                if (displaytype == null) {
                    return;
                }

                // TODO: Eventueel een (TypeScript) enum aanmaken voor de verschillende displaytypes
                switch (displaytype) {
                    case "input" :
                        this.templateUrl = ElementTemplates.getInput();
                        break;
                    case "textarea" :
                        this.templateUrl = ElementTemplates.getTextArea();
                        break;
                    case "div" :
                        this.templateUrl = ElementTemplates.getDiv(scopeName);
                        break;
                    case "dropdown" :
                        this.templateUrl = ElementTemplates.getDropdown(scopeName);
                        break;
                    default :
                        this.templateUrl = ElementTemplates.getInput();
                        break;
                }
            }
        }
    }
}
