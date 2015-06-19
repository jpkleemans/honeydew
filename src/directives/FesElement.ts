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
        constructor()
        {
            this.link = (scope, element, attrs) =>
            {

                var variablename = attrs['variableName'];
                var scopeobjvar = scope[variablename];
                switch(scopeobjvar['displayType'])
                {
                    case "input" :
                        this.templateUrl = 'defaultInput.html';
                        break;
                    default :
                        this.templateUrl = 'defaultInput.html';
                        break;
                }
            }
        }
    }
}
