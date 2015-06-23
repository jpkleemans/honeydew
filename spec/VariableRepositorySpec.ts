/// <reference path="../type_definitions/jasmine/jasmine.d.ts" />
/// <reference path="../src/entities/Variable.ts" />

declare var json;

declare class CalculationModel
{
    constructor(var1);
}

module Honeydew.Spec
{
    describe("VariableRepository", () =>
    {
        // SUT
        var variables:Fes.IVariableRepository;

        // Mocks
        var contextRepo;

        beforeEach(() =>
        {
            var v05instance = testjson['v05instance'];
            var v05layout = testjson['v05layout'];

            var calculationModel = {};
            calculationModel['OperatingProvisions'] = jasmine.createSpyObj('CalculationModel', ['getValue', 'setValue']);
            calculationModel['OperatingProvisions'].hIndex = [];
            calculationModel['OperatingProvisions'].hIndex[0] = null;

            calculationModel['FakeVariable'] = jasmine.createSpyObj('CalculationModel', ['getValue', 'setValue']);
            calculationModel['FakeVariable'].hIndex = [];
            calculationModel['FakeVariable'].hIndex[0] = null;

            // Mock ContextRepository
            contextRepo = jasmine.createSpyObj('ContextRepository', ['where']);

            variables = new VariableRepository(v05layout, contextRepo, calculationModel);
        });

        it("should find a variable by its key", () =>
        {
            var variable = variables.findByKey("OperatingProvisions");
            expect(variable).toEqual(jasmine.any(Variable));

            var variable1 = variables.findByKey("FakeVariable");
            expect(variable1).toEqual(jasmine.any(Variable));
        });

        it("should give an error when a variable is not found", () =>
        {
            expect(() => variables.findByKey("ThisOneDoesntExist")).toThrowError("This variable does not exist");
            expect(() => variables.findByKey("OperatingProvisions")).not.toThrowError();
        });
    });
}
