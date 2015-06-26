/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class ContextRepository implements Fes.IContextRepository
    {
        private calculationDocument;
        private calculationModel;

        constructor(calculationDocument, calculationModel)
        {
            this.calculationDocument = calculationDocument;
            this.calculationModel = calculationModel;
        }

        where(query:any):Array<Fes.IContext>
        {
            var columns = this.calculationDocument.viewmodes.detl.columns[query.timeline];
            var selection = columns.slice(query.start, query.end);

            var contexts = [];

            var variableModel = this.calculationModel[query.variableKey];

            if (variableModel === undefined) {
                variableModel = this.calculationModel["Q_MAP02_VALIDATION"];
            }

            var i;
            var length = selection.length;
            for (i = 0; i < length; i++) {
                var context = new Context(selection[i], variableModel);
                contexts.push(context);
            }

            return contexts;
        }

        first()
        {
            var timeline0Columns = this.calculationDocument.viewmodes.detl.columns[0];
            var ctx0 = timeline0Columns[1];

            return ctx0;
        }
    }
}
