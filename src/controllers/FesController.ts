/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/**
 * Created by bernard on 12-6-2015.
 */

module Honeydew
{
    export class FesController
    {
        public columnQuery:any;

        constructor($scope:angular.IScope)
        {
            $scope['columnQuery'] = '{"timeline": 0, "start": 0, "end": 4}';

            $scope['addChild'] = (variable) =>
            {
                variable.children.push({
                    attributes: {
                        value: 1000
                    },
                    children:[]
                });
            }
        }
    }
}
