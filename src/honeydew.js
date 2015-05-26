angular.module('honeydew', [])
    .constant('IVariableRepository', new Fes.Dummy.VariableRepository())
    .directive('fesInit', Honeydew.DirectiveFactory.FesInit())
    .directive('fesBindAttributes', Honeydew.DirectiveFactory.FesBindAttributes());
