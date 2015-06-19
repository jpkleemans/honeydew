/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class ElementTemplates
    {

        constructor($templateCache:angular.ITemplateCacheService)
        {
            $templateCache.put('defaultInput.html', '<input type=text />')
        }
    }
}
