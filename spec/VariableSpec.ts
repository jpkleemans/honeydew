/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />

module Honeydew.Spec
{
    describe("Variable", () =>
    {
        var variable:Variable;

        beforeEach(() =>
        {
            variable = new Variable("FakeVariable", null);
            spyOn(variable, "changed")
        });

        it("should have a key", () =>
        {
            expect(variable.key()).toEqual("FakeVariable");
        });

        it("should not be able to overrule it's key", () =>
        {
            variable.key("Balance");
            expect(variable.key()).not.toEqual("Balance");
            expect(variable.key()).toEqual("FakeVariable");
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
        });

        it("should call the update callback when it's attributes are changed", () =>
        {
            variable.attributes({
                value: 3
            });
            expect(variable.changed()).toHaveBeenCalled();
        });
    });
}
