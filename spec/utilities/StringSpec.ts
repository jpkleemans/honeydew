/// <reference path="../../type_definitions/jasmine/jasmine.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts"/>
/// <reference path="../../src/utilities/String.ts"/>


module Honeydew.Spec
{
    describe("String", () =>
    {
        var stringclass;

        beforeEach(() =>
        {
            stringclass = new String();
        });

        it("should capitalize the first character of a string", () =>
        {
            expect(stringclass.ucfirst("text")).toEqual("Text");
            expect(stringclass.ucfirst("Text")).toEqual("Text");
        });

        it("should check if a string contains another string", () =>
        {
            var string1 = "teststring";
            var string2 = "str";
            var string3 = "param";

            expect(stringclass.contains(string1, string2)).toEqual(true);
            expect(stringclass.contains(string1, string3)).toEqual(false);
        });
    });
}

