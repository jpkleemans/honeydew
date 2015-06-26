/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class InlineTemplate
    {
        public priority = 1010;
        public restrict = 'A';
        public compile;

        constructor($templateCache:angular.ITemplateCacheService)
        {
            this.compile = (element:angular.IAugmentedJQuery, attrs:angular.IAttributes) =>
            {
                var templateName = attrs['inlineTemplate'];
                $templateCache.put(templateName, element[0].innerHTML);
            }
        }
    }
}
