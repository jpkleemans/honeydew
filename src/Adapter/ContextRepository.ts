module Honeydew
{
    export class ContextRepository implements Fes.IContextRepository
    {
        private calculationDocument;
        private calculationModel;
        private variableRepo:VariableRepository;

        constructor(calculationDocument, calculationModel, variableRepo:VariableRepository)
        {
            this.calculationDocument = calculationDocument;
            this.calculationModel = calculationModel;
            this.variableRepo = variableRepo;
        }

        where(query:any)
        {
            var columns = this.calculationDocument['viewmodes']['detl']['columns'][query.timeline];
            var selection = columns.slice(query.start, query.end);

            var contexts = [];

            var i;
            var length = selection.length;
            for (i = 0; i < length; i++) {
                var context = new Context(this.calculationModel[query.variableKey], this.variableRepo);
                contexts.push(context);
            }

            return contexts;
        }
    }
}
