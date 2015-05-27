angular.module('honeydew', [])
    .constant('IVariableRepository', new VariableRepository())
    //.directive('fesInit', Honeydew.DirectiveFactory.FesInit())
    .directive('fesBindAttributes', Honeydew.DirectiveFactory.FesBindAttributes())
    .directive('fesRepeat', Honeydew.DirectiveFactory.FesRepeat());
