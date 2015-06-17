/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />
/// <reference path="../src/Adapter/Variable.ts" />

declare var json;

module Honeydew.Spec
{
    describe("VariableRepository", () =>
    {
        var variables:Fes.IVariableRepository;

        beforeEach(() =>
        {
            var v05Instance = json['v05instance'];
            var userFormulas = json['defaultmath'];
            var importData = json['v05baseimportinstance'];
            var v05layout = json['v05layout'];

            variables = new VariableRepository(v05Instance, userFormulas, importData, v05layout);
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
