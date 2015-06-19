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

        constructor(ElementTemplates: ElementTemplates)
        {
            this.link = (scope, element, attrs) =>
            {

                var variablename = attrs['variableName'];
                if(variablename == null)
                {
                    return;
                }
                var displayTypes = ['input', 'textarea', 'div'];
                var rand = displayTypes[Math.floor(Math.random() * displayTypes.length)];
                var scopeobjvar = scope[variablename];
                switch(rand)
                {
                    case "input" :
                        this.templateUrl = ElementTemplates.getInput(variablename);
                        break;
                    case "textarea" :
                        this.templateUrl = ElementTemplates.getTextArea(variablename);
                        break;
                    case "div" :
                        this.templateUrl = ElementTemplates.getDiv(variablename);
                        break;
                    default :
                        this.templateUrl = ElementTemplates.getInput(variablename);
                        break;
                }
            }
        }
    }
}
