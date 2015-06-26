/// <reference path="../type_definitions/jasmine/jasmine.d.ts" />

declare var testjson;

module Honeydew.Spec
{
    describe("Variable", () =>
    {
        // SUT
        var variable:Fes.IVariable;

        // Mocks
        var variableRepo, contextRepo, variableModel;

        beforeEach(() =>
        {
            // Mock CalculationModel
            variableModel = jasmine.createSpyObj('CalculationModel', ['setValue', 'getValue']);
            variableModel.hIndex = [];
            variableModel.hIndex[0] = null;

            // Mock VariableRepository
            variableRepo = jasmine.createSpyObj('VariableRepository', ['updateAll', 'find', 'findRange']);
            variableRepo.find.and.callFake((key) =>
            {
                return {
                    key: () => key
                };
            });
            variableRepo.findRange.and.callFake((keys) =>
            {

                var children = [];
                var i;
                var length = keys.length;
                for (i = 0; i < length; i++) {
                    children.push({
                        _key: keys[i],
                        key: function ()
                        {
                            return this._key;
                        }
                    });
                }

                return children;
            });

            // Mock ContextRepository
            contextRepo = jasmine.createSpyObj('ContextRepository', ['where', 'first']);
            contextRepo.where.and.callFake((query) =>
            {
                var contexts = [];
                var total = query.end - query.start;
                while (total--) {
                    contexts.push({});
                }

                return contexts;
            });

            // Get children from test-json
            var childrenKeys = Object.keys(testjson['v05layout']["Q_ROOT"]);

            variable = new Variable("Q_ROOT", childrenKeys, variableRepo, contextRepo, variableModel);
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
            expect(variableModel.setValue).toHaveBeenCalled();
        });

        //it("should call the update callback when it's attributes are changed", () =>
        //{
        //    variable.attributes({
        //        value: 3
        //    });
        //    expect(variableRepo.updateAll).toHaveBeenCalled();
        //});

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
