/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />

declare var testjson;

module Honeydew.Spec
{
    describe("Variable", () =>
    {
        // SUT
        var variable:Fes.IVariable;

        // Mocks
        var variableRepo, contextRepo, calculationModel;

        beforeEach(() =>
        {
            // Mock CalculationModel
            calculationModel = jasmine.createSpyObj('CalculationModel', ['setValue', 'getValue']);

            // Mock VariableRepository
            variableRepo = jasmine.createSpyObj('VariableRepository', ['updateAll', 'findByKey']);
            variableRepo.findByKey.and.callFake((key) =>
            {
                return {
                    key: () => key
                };
            });

            // Mock ContextRepository
            contextRepo = jasmine.createSpyObj('ContextRepository', ['findByQuery']);
            contextRepo.findByQuery.and.callFake((query) =>
            {
                var contexts = [];
                var total = query.end - query.start;
                while (total--) {
                    contexts.push({});
                }

                return contexts;
            });

            // Get children from test-json
            var childrenKeys = testjson['v05layout']["Q_ROOT"];

            variable = new Variable("Q_ROOT", childrenKeys, variableRepo, contextRepo, calculationModel);
        });

        it("should have a key", () =>
        {
            expect(variable.key()).toEqual("Q_ROOT");
        });

        it("should be able to set and get it's attributes", () =>
        {
            variable.attributes({
                value: 1058,
                type: "text"
            });

            var attributes = variable.attributes();
            expect(attributes.value).toEqual(1058);
            expect(attributes.type).toEqual("text");
            expect(calculationModel.setValue).toHaveBeenCalled();
        });

        it("should call the update callback when it's attributes are changed", () =>
        {
            variable.attributes({
                value: 3
            });
            expect(variableRepo.updateAll).toHaveBeenCalled();
        });

        it("should be able to get it's children", () =>
        {
            var children = variable.children();
            expect(children.length).toEqual(3);
            expect(children[0].key()).toEqual("OperatingProvisions");
        });

        it("should be able to get it's contexts", () =>
        {
            var query = {
                "timeline": 0,
                "start": 1,
                "end": 4
            };
            var contexts = variable.contexts(query);
            expect(contexts.length).toEqual(3);

            var query = {
                "timeline": 0,
                "start": 0,
                "end": 6
            };
            var contexts = variable.contexts(query);
            expect(contexts.length).toEqual(6);
        });
    });
}
