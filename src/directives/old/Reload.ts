/// <reference path="../../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

class Reload implements angular.IDirective
{
    IDirectivePrePost;

    constructor(private $compile:angular.ICompileService)
    {
    }

    link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs:angular.IAttributes, ctrl:any) =>
    {
        console.log(this.$compile);
    };

    public static factory():angular.IDirectiveFactory
    {
        var directive = ($compile:angular.ICompileService) => new Reload($compile);
        directive.$inject = ['$compile'];
        return directive;
    }
}
