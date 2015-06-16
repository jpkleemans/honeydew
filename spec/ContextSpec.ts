/// <reference path="../type_definitions/Jasmine/jasmine.d.ts" />

module Honeydew.Spec
{
    describe("Context", () =>
    {
        var context:Context;

        beforeEach(() =>
        {
            context = new Context("FakeContext");
            spyOn(context, "changed")
        });

        it("should have a key", () =>
        {
            expect(context.key()).toEqual("FakeContext");
        });

        it("should not be able to overrule it's key", () =>
        {
            context.key("BalanceContext");
            expect(context.key()).not.toEqual("BalanceContext");
            expect(context.key()).toEqual("FakeContext");
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
        });

        it("should call the update callback when it's attributes are changed", () =>
        {
            context.attributes({
                value: 3
            });
            expect(context.changed()).toHaveBeenCalled();
        });
    });
}

