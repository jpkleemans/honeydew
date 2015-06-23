/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

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
        constructor(ElementTemplates:ElementTemplates, $templateCache: angular.ITemplateCacheService, $compile:angular.ICompileService)
        {
            this.link = (scope, element, attrs) =>
            {
                //Naam van de variable op de scope.
                var param = attrs['fesElement'];
                var scopeName = param.split('.')[0];
                var displaytype = scope.$eval(param);
                if (displaytype == null) {
                    return;
                }
                /*
                console.log('param: ' + param);
                console.log('scope val: ' + scopeName);
                console.log('displayType: ' + displaytype);
                console.log('-----------------------');
                */
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
