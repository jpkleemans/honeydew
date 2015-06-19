/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../services/ElementTemplates.ts" />
module Honeydew
{
    export class ServiceFactory
    {
        public static createElementTemplates()
        {
            var service = ($templateCache) =>
            {
                return new ElementTemplates($templateCache);
            };

            service['$inject'] = ['$templateCache'];

            return service;
        }

    }
}
