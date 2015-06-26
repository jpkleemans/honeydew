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
        var variableRepo:Fes.IVariableRepository;

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

            variableRepo = new VariableRepository(v05layout, contextRepo, cache, calculationModel);
        });

        it("finds a variable by its key", () =>
        {
            var variable = variableRepo.find("OperatingProvisions");
            expect(variable).toEqual(jasmine.any(Variable));

            var variable1 = variableRepo.find("FakeVariable");
            expect(variable1).toEqual(jasmine.any(Variable));
        });

        it("throws an error when a variable is not found", () =>
        {
            expect(() => variableRepo.find("ThisOneDoesntExist")).toThrowError("This variable does not exist");
            expect(() => variableRepo.find("OperatingProvisions")).not.toThrowError();
        });

        it("finds a range of variables by their keys", () =>
        {
            var variables = variableRepo.findRange(["OperatingProvisions", "FakeVariable"]);
            expect(variables.length).toEqual(2);
            expect(variables[0]).toEqual(jasmine.any(Variable));
        });

        it("caches found variables", () =>
        {
            variableRepo.find("OperatingProvisions");
            expect(cache.add).toHaveBeenCalled();
        });
    });
}
