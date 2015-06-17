module Honeydew
{
    export class Variable implements Fes.IVariable
    {
        private key:string;
        private title:string;
        private attributes:any;
        private engine:any;
        private instancevariable:any;
        private ctx0:any;
        private children:Array<Fes.IVariable>;
        private contexts:Array<Fes.IContext>;
        private variables:VariableRepository;

        constructor(key:string, engine:any, variables:VariableRepository)
        {
            this.key = key;
            this.title = key;
            this.engine = engine;
            this.variables = variables;
            this.children = [];
            this.contexts = [];
            this.instancevariable = engine.activeModel[this.key];

            var timeline0Columns = engine.calcDocument.viewmodes.detl.columns[0];
            this.ctx0 = timeline0Columns[1];

            this.update();
        }

        key():string
        {
            return this.key;
        }

        title():string
        {
            return this.title;
        }

        attributes(attributes:any = null):any
        {
            if (attributes === null) {
                return this.attributes;
            }
            this.instancevariable.setValue(this.instancevariable.hIndex[0], 0, this.ctx0, parseFloat(attributes.value));

            this.variables.updateAll();

            this.attributes = attributes;
        }

        children():Array<Fes.IVariable>
        {
            if (this.children().length === 0) {
                var layout = this.engine.layout[this.key];
                var children = [];
                if (this.instancevariable !== undefined && layout !== undefined) {
                    for (var childkey in layout) {
                        if (layout.hasOwnProperty(childkey)) {
                            var childVariable = this.variables.findByKey(childkey);
                            children.push(childVariable);
                        }
                    }
                }
                this.children = children;
            }
            return this.children;
        }

        contexts(query:any = null):Array<Fes.IContext>
        {
            if (query !== null) {
                //for now just quick fix (variable.account == 1058 ? 'doc' : 'detl')
                //doc type should just return two entrees, TITLE,DOCVALUE
                var cols = this.engine.calcDocument.viewmodes.detl.columns[query.timeline].slice(query.start, (this.instancevariable.account == 1058 ? 1 : query.end));
                var contexts = [];
                cols.forEach(function (col)
                {
                    var context = new Context(this.instancevariable, col);
                    contexts.push(context);
                });

                this.contexts = contexts;
            }

            return undefined;
        }

        update()
        {
            this.attributes = {
                value: this.instancevariable == undefined ? 0 : this.instancevariable.getValue(this.instancevariable.hIndex[0], 0, this.ctx0),
                style: {
                    color: "red"
                }
            };

            this.contexts.forEach(function (context)
            {
                context.update();
            });
        }
    }
}