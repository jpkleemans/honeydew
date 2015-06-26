/// <reference path="../../type_definitions/jasmine/jasmine.d.ts" />
/// <reference path="../../src/repositories/IContextRepository.ts" />

declare var testjson;

declare class CalculationDocument
{
    constructor(var1);
}

declare class ContextRepository
{
    constructor(var1, var2);
}

module Honeydew.Spec
{
    describe("ContextRepository", () =>
    {
        // SUT
        var contextRepo:IContextRepository;

        beforeEach(() =>
        {
            var importData = testjson['v05baseimportinstance'];
            var v05Instance = testjson['v05instance'];
            var CalculationModel = {};
            CalculationModel['Q_ROOT_VARIABLE_ONE'] = jasmine.createSpyObj('CalculationModel', ['getValue', 'setValue']);
            CalculationModel['Q_ROOT_VARIABLE_ONE'].hIndex = [];
            CalculationModel['Q_ROOT_VARIABLE_ONE'].hIndex[0] = null;

            var CalculationDocument = jasmine.createSpyObj('CalculationDocument', ['getValue', 'setValue']);
            CalculationDocument.viewmodes = {};
            CalculationDocument.viewmodes.det1 = {};
            CalculationDocument.viewmodes.det1.columns = [];
            CalculationDocument.viewmodes.det1.columns[0] = [{}, {}, {}, {}, {}, {}, {}, {}];
            contextRepo = new ContextRepository(CalculationDocument, CalculationModel);
        });

        it("finds contexts by a query", () =>
        {
            var testquery = {
                "timeline": 0,
                "start": 0,
                "end": 4,
                "variableKey": "Q_ROOT_VARIABLE_ONE"
            };
            expect(testquery.end).toEqual(4);
        });

        it("finds the first context", () =>
        {
            var testquery = {
                "timeline": 0,
                "start": 0,
                "end": 4,
                "variableKey": "Q_ROOT_VARIABLE_ONE"
            };
            expect(testquery.start).toEqual(0);
        });
    });
}
