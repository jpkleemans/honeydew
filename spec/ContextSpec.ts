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

            var instancevariable = {};
            spyOn(instancevariable, 'setValue');
            spyOn(instancevariable, 'getValue');

            variableRepo = new VariableRepository({}, {}, {}, {});
            spyOn(variableRepo, 'updateAll');

            context = new Context(instancevariable, engine, variableRepo);
        });

        it("should have a key", () =>
        {
            expect(context.key()).toEqual("FakeContext");
        });

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
        });

        it("should call the update callback when it's attributes are changed", () =>
        {
            context.attributes({
                value: 3
            });
            expect(variableRepo.updateAll()).toHaveBeenCalled();
        });
    });
}

