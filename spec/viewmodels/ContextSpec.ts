/// <reference path="../../type_definitions/jasmine/jasmine.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts" />
/// <reference path="../../src/viewmodels/Context.ts" />

module Honeydew.Spec
{
    describe("Context", () =>
    {
        // SUT
        var context:Fes.IContext;

        // Mocks
        var calculationModel, variableRepo;

        beforeEach(() =>
        {
            // Mock CalculationModel
            calculationModel = jasmine.createSpyObj('CalculationModel', ['setValue', 'getValue']);
            calculationModel.hIndex = [];
            calculationModel.hIndex[0] = null;

            // Mock column
            var column = {};

            context = new Context(column, calculationModel);
        });

        it("sets and gets its attributes", () =>
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

        it("gets its displayType", () =>
        {
            expect(context.displayType()).toEqual("input");
        });
    });
}

