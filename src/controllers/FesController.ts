/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/**
 * Created by bernard on 12-6-2015.
 */

module Honeydew {
    export class FesController {
        public columnQuery:any;

        constructor($scope:angular.IScope) {
            $scope['columnQuery'] = '';
        }
    }
}