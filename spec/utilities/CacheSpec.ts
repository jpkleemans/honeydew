/// <reference path="../../type_definitions/jasmine/jasmine.d.ts" />
/// <reference path="../../src/utilities/Cache.ts"/>

module Honeydew.Spec
{
    describe("Cache", () =>
    {
        var cacheclass;

        beforeEach(() =>
        {
            cacheclass = new Cache<Number>();
        });

        it("should cache items and get items", () =>
        {
            cacheclass.add("testint", 4);
            expect(cacheclass.get("testint")).toEqual(4);
        });

        it("should check if an item is cached", () =>
        {
            cacheclass.add("testkey", 19);

            expect(cacheclass.has("testkey")).toEqual(true);
            expect(cacheclass.has("test")).toEqual(false);
        });

        it("should return all cached items", () =>
        {
            cacheclass.add("testvalue", 23);
            cacheclass.add("testvalue2", 409);
            cacheclass.add("testvalue3", 59763);

            var items = cacheclass.all();

            expect(Object.keys(items).length).toEqual(3);
        });

        it("should remove items from the cache", () =>
        {
            cacheclass.add("testkey", 35);
            cacheclass.add("testkey2", 39);

            expect(cacheclass.remove("testkey"));

            expect(cacheclass.has("testkey")).toEqual(false);
            expect(cacheclass.has("testkey2")).toEqual(true);
        });
    });
}

