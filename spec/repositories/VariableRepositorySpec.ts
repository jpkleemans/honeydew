/// <reference path="../../type_definitions/jasmine/jasmine.d.ts" />

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
        var contextRepo, cache;

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
            contextRepo = jasmine.createSpyObj('ContextRepository', ['where', 'first']);

            // Mock Cache
            cache = jasmine.createSpyObj('Cache', ['add', 'has', 'get', 'all']);

            variables = new VariableRepository(v05layout, contextRepo, cache, calculationModel);
        });

        it("finds a variable by its key", () =>
        {
            var variable = variables.find("OperatingProvisions");
            expect(variable).toEqual(jasmine.any(Variable));

            var variable1 = variables.find("FakeVariable");
            expect(variable1).toEqual(jasmine.any(Variable));
        });

        it("throws an error when a variable is not found", () =>
        {
            expect(() => variables.find("ThisOneDoesntExist")).toThrowError("This variable does not exist");
            expect(() => variables.find("OperatingProvisions")).not.toThrowError();
        });

        it("finds a range of variables by their keys", () =>
        {
            var variables = variables.findRange(["OperatingProvisions", "FakeVariable"]);
            expect(variables.length).toEqual(2);
            expect(variables[0]).toEqual(jasmine.any(Variable));
        });

        it("caches found variables", () =>
        {
            var variable = variables.find("OperatingProvisions");
            expect(cache.add).toHaveBeenCalled();
        });
    });
}
