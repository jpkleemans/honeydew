/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />
/// <reference path="../type_definitions/fes/fes.d.ts" />
/// <reference path="../src/Adapter/VariableRepository.ts" />
/// <reference path="../src/Adapter/Context.ts" />

declare var json;

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
            expect(calculationModel.setValue).toHaveBeenCalled();
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

