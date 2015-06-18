/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />

declare var json;

module Honeydew.Spec
{
    describe("Variable", () =>
    {
        var variable:Fes.IVariable;
        var variableRepo;
        var engine;

        beforeEach(() =>
        {
            var v05Instance = json['v05instance'];
            var userFormulas = json['defaultmath'];
            var importData = json['v05baseimportinstance'];
            var v05layout = json['v05layout'];
            engine = {
                maxChildVariables: 600,
                modelBuilder: new FormulaBootstrap(v05Instance, userFormulas),
                activeModel: new CalculationModel(v05Instance),
                calcDocument: new CalculationDocument(importData),
                layout: v05layout
            };

            variableRepo = jasmine.createSpyObj('VariableRepository', ['updateAll', 'findByKey']);

            variableRepo.findByKey.and.callFake((key) =>
            {
                return {
                    key: () => key
                };
            });

            variable = new Variable("Q_ROOT", engine, variableRepo);
        });

        it("should have a key", () =>
        {
            expect(variable.key()).toEqual("Q_ROOT");
        });

        //it("should not be able to overrule it's key", () =>
        //{
        //    variable.key("Balance");
        //    expect(variable.key()).not.toEqual("Balance");
        //    expect(variable.key()).toEqual("Q_ROOT");
        //});

        it("should be able to set and get it's attributes", () =>
        {
            variable.attributes({
                value: 1058,
                type: "text"
            });

            var attributes = variable.attributes();
            expect(attributes.value).toEqual(1058);
            expect(attributes.type).toEqual("text");
        });

        it("should be able to get it's children", () =>
        {
            var children = variable.children();
            expect(children.length).toEqual(3);
            expect(children[0].key()).toEqual("OperatingProvisions");
        });

        it("should be able to get it's contexts", () =>
        {
            var timeline = 0;

            engine.calcDocument.viewmodes.detl.columns[timeline] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

            var query = {
                "timeline": timeline,
                "start": 1,
                "end": 4
            };
            var contexts = variable.contexts(query);
            expect(contexts.length).toEqual(3);

            var query = {
                "timeline": timeline,
                "start": 0,
                "end": 6
            };
            var contexts = variable.contexts(query);
            expect(contexts.length).toEqual(6);
        });

        it("should call the update callback when it's attributes are changed", () =>
        {
            variable.attributes({
                value: 3
            });
            expect(variableRepo.updateAll).toHaveBeenCalled();
        });

    });
}
