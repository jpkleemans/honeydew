/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />
/// <reference path="../src/Adapter/Variable.ts" />

declare var json;

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
            var v05instance = json['v05instance'];
            var v05layout = json['v05layout'];

            // Mock ContextRepository
            contextRepo = jasmine.createSpyObj('ContextRepository', []);

            variables = new VariableRepository(v05instance, v05layout, contextRepo);
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
