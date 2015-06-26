/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class ElementTemplates
    {
        private $templateCache:angular.ITemplateCacheService;

        constructor($templateCache:angular.ITemplateCacheService)
        {
            this.$templateCache = $templateCache;
        }

        public getInput():string
        {
            var templateURL = 'defaultInput.html';
            if (this.$templateCache.get(templateURL)) {
                return templateURL;
            }
            this.$templateCache.put(templateURL, '<input />');
            return templateURL;
        }

        public getTextArea():string
        {
            var templateURL = 'defaultTextArea.html';
            if (this.$templateCache.get(templateURL)) {
                return templateURL;
            }
            this.$templateCache.put(templateURL, '<textarea></textarea>');
            return templateURL;
        }

        public getDiv(key):string
        {
            var templateURL = 'default'+key+'Div.html';
            if (this.$templateCache.get(templateURL)) {
                return templateURL;
            }
            this.$templateCache.put(templateURL, '<div>{{' + key + '.attributes().value()}}</div>');
            return templateURL;
        }

        public getDropdown(key):string
        {
            var templateURL = 'default'+key+'Dropdown.html';
            if (this.$templateCache.get(templateURL)) {
                return templateURL;
            }
            this.$templateCache.put(templateURL, '<select ng-options="item.attributes().value() as item.key() for item in '+key+'.children()"></select>');
            return templateURL;
        }

    }
}
