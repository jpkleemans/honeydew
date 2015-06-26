/// <reference path="../../type_definitions/jasmine/jasmine.d.ts" />
/// <reference path="../../type_definitions/fes/fes.d.ts"/>
/// <reference path="../../src/utilities/ServiceContainer.ts"/>

module Honeydew.Spec
{
    describe("ServiceContainer", () =>
    {
        var container;

        beforeEach(() =>
        {
            container = new ServiceContainer();
        });

        it("should add services to the container", () =>
        {
            container.singleton('Service01', function (container)
            {
                var answer = "I am a service!";
                return answer;
            });

            expect(container.resolve('Service01')).toEqual("I am a service!");
        });

        it("should resolve services and inject the needed dependencies", () =>
        {
            container.singleton('Service01', function (container)
            {
                var answer = "I am a service!";
                return answer;
            });

            container.singleton('Service02', function (container)
            {
                return container.resolve('Service01');
            });

            expect(container.resolve('Service02')).toEqual("I am a service!");

        });

        it("should throw an error when a service does not exist", () =>
        {
            expect(container.resolve('Service03')).toThrowError("Service does not exist");
        });

        it("should check if a service exists", () =>
        {
            container.singleton('Service05', function (container)
            {
                var text = "I am added!";
                return text;
            });

            expect(container.has('Service05')).toEqual(true);
        });

        it("should remove services from the container", () =>
        {
            container.singleton('Service03', function (container)
            {
                var answer = "I am a service!";
                return answer;
            });

            container.singleton('Service04', function (container)
            {
                var number = 35;
                return number;
            });

            container.remove('Service03');

            expect(container.has('Service03')).toEqual(false);
            expect(container.has('Service04')).toEqual(true);
        });

    });
}

