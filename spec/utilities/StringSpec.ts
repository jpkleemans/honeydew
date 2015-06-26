/// <reference path="../../type_definitions/jasmine/jasmine.d.ts" />
/// <reference path="../../src/utilities/String.ts"/>

module Honeydew.Spec
{
    describe("String", () =>
    {
        it("should capitalize the first character of a string", () =>
        {
            expect(String.ucfirst("text")).toEqual("Text");
            expect(String.ucfirst("Text")).toEqual("Text");
            expect(String.ucfirst("tEXT")).toEqual("TEXT");
        });

        it("should check if a string contains another string", () =>
        {
            var string1 = "teststring";
            var string2 = "str";
            var string3 = "param";

            expect(String.contains(string1, string2)).toEqual(true);
            expect(String.contains(string1, string3)).toEqual(false);
        });
    });
}

