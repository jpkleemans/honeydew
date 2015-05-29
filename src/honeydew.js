angular.module('honeydew', [])
    .constant('IVariableRepository', new Fes.DummyVariableRepository())
    //.directive('fesInit', Honeydew.DirectiveFactory.FesInit())
    .directive('fesBindAttributes', Honeydew.DirectiveFactory.FesBindAttributes())
    .directive('fesRepeat', Honeydew.DirectiveFactory.FesRepeat());
