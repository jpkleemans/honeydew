/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />
/// <reference path="../src/Adapter/VariableRepository.ts" />
/// <reference path="../src/Adapter/Context.ts" />

declare var json;

module Honeydew.Spec
{
    describe("Context", () =>
    {
        var context:Fes.IContext;
        var variableRepo;
        var instancevariable;

        beforeEach(() =>
        {
            var v05Instance = json['v05instance'];
            var userFormulas = json['defaultmath'];
            var importData = json['v05baseimportinstance'];
            var v05layout = json['v05layout'];
            var engine = {
                maxChildVariables: 600,
                modelBuilder: new FormulaBootstrap(v05Instance, userFormulas),
                activeModel: new CalculationModel(v05Instance),
                calcDocument: new CalculationDocument(importData),
                layout: v05layout
            };

            instancevariable = jasmine.createSpyObj('instancevariable', ['setValue', 'getValue']);
            instancevariable.hIndex = [];
            instancevariable.hIndex[0] = null;

            variableRepo = jasmine.createSpyObj('VariableRepository', ['updateAll', 'findByKey']);

            context = new Context(instancevariable, engine, variableRepo);
        });

        //it("should have a key", () =>
        //{
        //    expect(context.key()).toEqual("FakeContext");
        //});

        //it("should not be able to overrule it's key", () =>
        //{
        //    context.key("BalanceContext");
        //    expect(context.key()).not.toEqual("BalanceContext");
        //    expect(context.key()).toEqual("FakeContext");
        //});

        it("should be able to set and get it's attributes", () =>
        {
            context.attributes({
                style: {
                    color: "blue"
                },
                type: "number"
            });

            var attributes = context.attributes();
            expect(attributes.style.color).toEqual("blue");
            expect(attributes.type).toEqual("number");

            expect(instancevariable.setValue).toHaveBeenCalled();
        });

        it("should call the update callback when it's attributes are changed", () =>
        {
            context.attributes({
                value: 3
            });
            expect(variableRepo.updateAll).toHaveBeenCalled();
        });
    });
}

