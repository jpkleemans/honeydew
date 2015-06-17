module Honeydew
{
    export class Variable implements Fes.IVariable
    {
        private _key:string;
        private _title:string;
        private _attributes:any;
        private _engine:any;
        private _instancevariable:any;
        private _ctx0:any;
        private _children:Array<Fes.IVariable>;
        private _contexts:Array<Fes.IContext>;
        private _variables:VariableRepository;

        constructor(key:string, engine:any, variables:VariableRepository)
        {
            this._key = key;
            this._title = key;
            this._engine = engine;
            this._variables = variables;
            this._children = [];
            this._contexts = [];
            this._instancevariable = engine.activeModel[this._key];

            var timeline0Columns = engine.calcDocument.viewmodes.detl.columns[0];
            this._ctx0 = timeline0Columns[1];

            this.update();
        }

        key():string
        {
            return this._key;
        }

        title():string
        {
            return this._title;
        }

        attributes(attributes?:any):any
        {
            if (typeof attributes === "undefined") {
                return this._attributes;
            }
            this._instancevariable.setValue(this._instancevariable.hIndex[0], 0, this._ctx0, parseFloat(attributes.value));

            this._variables.updateAll();

            this._attributes = attributes;
        }

        children():Array<Fes.IVariable>
        {
            if (this._children.length === 0) {
                var layout = this._engine.layout[this._key];
                var children = [];
                if (this._instancevariable !== undefined && layout !== undefined) {
                    for (var childkey in layout) {
                        if (layout.hasOwnProperty(childkey)) {
                            var childVariable = this._variables.findByKey(childkey);
                            children.push(childVariable);
                        }
                    }
                }
                this._children = children;
            }
            return this._children;
        }

        contexts(query:any = null):Array<Fes.IContext>
        {
            if (query !== null) {
                //for now just quick fix (variable.account == 1058 ? 'doc' : 'detl')
                //doc type should just return two entrees, TITLE,DOCVALUE
                var cols = this._engine.calcDocument.viewmodes.detl.columns[query.timeline].slice(query.start, (this._instancevariable.account == 1058 ? 1 : query.end));
                var contexts = [];
                cols.forEach(function (col)
                {
                    var context = new Context(this._instancevariable, col, this.variables);
                    contexts.push(context);
                });

                this._contexts = contexts;
            }

            return undefined;
        }

        update()
        {
            this._attributes = {
                value: this._instancevariable == undefined ? 0 : this._instancevariable.getValue(this._instancevariable.hIndex[0], 0, this._ctx0),
                style: {
                    color: "red"
                }
            };

            this._contexts.forEach(function (context)
            {
                context.update();
            });
        }
    }
}
