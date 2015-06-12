/// <reference path="../../type_definitions/angularjs/angular.d.ts" />

module Honeydew
{
    export class ControllerFactory
    {
        public static createFesController()
        {
            var controller = ($scope:angular.IScope) =>
            {
                return new FesController($scope);
            };

            controller['$inject'] = ['$scope'];

            return controller;
        }

    }
}
