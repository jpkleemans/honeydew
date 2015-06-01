/// <reference path="../type_definitions/angularjs/angular.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />

//please insert Directives like this
//or another "easier/cleaner" way, don't combine all Directives into one, will mess up the structure
//not sure if Directive is the correct way to make a Reload, i want a button to reload a Directive.
class Reload implements ng.IDirective
{
    constructor(private $compile: angular.ICompileService)
    {
    }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) =>
    {
        console.log(this.$compile);
    }

    public static factory(): ng.IDirectiveFactory
    {
        var directive = ($compile: angular.ICompileService) => new Reload($compile);
        directive.$inject = ['$compile'];
        return directive;
    }
}
