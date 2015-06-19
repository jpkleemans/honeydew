/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class ElementTemplates
    {
        private $templateCache : angular.ITemplateCacheService;

        constructor($templateCache:angular.ITemplateCacheService)
        {
            this.$templateCache = $templateCache;
        }

        public getInput(variable) : string
        {
            var templateURL = 'defaultInput.html';
            if(this.$templateCache.get(templateURL))
            {
                return templateURL;
            }
            this.$templateCache.put(templateURL, '<input type="text" />')
            return templateURL;
        }

        public getTextArea(variable) : string
        {
            var templateURL = 'defaultTextArea'+variable+'.html';
            if(this.$templateCache.get(templateURL))
            {
                return templateURL;
            }
            this.$templateCache.put(templateURL, '<textarea rows="2" cols="20"></textarea>')
            return templateURL;
        }

        public getDiv(variable) : string
        {
            var templateURL = 'defaultDiv'+variable+'.html';
            if(this.$templateCache.get(templateURL))
            {
                return templateURL;
            }
            console.log(variable);
            this.$templateCache.put(templateURL, '<div>{{'+variable+'.key}} : {{'+variable+'.attributes.value}}</div>')
            return templateURL;
        }

    }
}
