/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../directives/reload.ts" />

class App
{
    static createModule(angular: ng.IAngularStatic)
    {
        angular.module('app', ['honeydew']); 
        angular.module('honeydew', [])
            .constant('IVariableRepository', new VariableRepository())
            .directive('reload', Reload.factory())
            .directive('fesBindAttributes', Honeydew.DirectiveFactory.FesBindAttributes())
            .directive('fesRepeat', Honeydew.DirectiveFactory.FesRepeat());
        console.info('Angular bindings done.');
    }
}
App.createModule(angular);