/// <reference path="ContextRepository.ts" />

module Honeydew
{
    export class Variable implements Fes.IVariable
    {
        private childrenKeys:Array<string>;
        private variableRepo:VariableRepository;
        private contextRepo:ContextRepository;
        private variableModel;
        private prevQuery:string;

        // Backing fields
        private _key:string;
        private _title:string;
        private _attributes:any;
        private _children:Array<Fes.IVariable>;
        private _contexts:Array<Fes.IContext>;

        constructor(key:string,
                    childrenKeys:Array<string>,
                    variableRepo:VariableRepository,
                    contextRepo:ContextRepository,
                    variableModel)
        {
            this.childrenKeys = childrenKeys;
            this.variableRepo = variableRepo;
            this.contextRepo = contextRepo;
            this.variableModel = variableModel;

            this._key = key;
            this._title = key;
            this._attributes = {};
            this._children = [];
            this._contexts = [];

            // Initial update to get the attributes from calculationModel
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

            this._attributes = attributes; // TODO: maybe unnecessary

            this.variableModel.setValue(this.variableModel['hIndex'][0], 0, this.contextRepo.first(), parseFloat(attributes.value));
            this.variableRepo.updateAll();
        }

        children():Array<Fes.IVariable>
        {
            if (this._children.length === 0) {
                var children = [];

                var i;
                var length = this.childrenKeys.length;
                for (i = 0; i < length; i++) {
                    var childKey = this.childrenKeys[i];
                    var childVariable = this.variableRepo.findByKey(childKey);
                    children.push(childVariable);
                }

                this._children = children;
            }
            return this._children;
        }

        contexts(query:any = null):Array<Fes.IContext>
        {
            if (query !== this.prevQuery) {
                this.prevQuery = query;
                query = typeof query === "string" ? JSON.parse(query) : query;

                //for now just quick fix (variable.account == 1058 ? 'doc' : 'detl')
                query.end = this.variableModel['account'] == 1058 ? 1 : query.end;

                query.variableKey = this._key;

                this._contexts = this.contextRepo.where(query);
            }

            return this._contexts;
        }

        update()
        {
            this._attributes.value = (value) =>
            {
                if (typeof value === "undefined") {
                    return this.variableModel.getValue(this.variableModel['hIndex'][0], 0, this.contextRepo.first());
                }

                this.variableModel.setValue(this.variableModel['hIndex'][0], 0, this.contextRepo.first(), parseFloat(value));
            };

            this._attributes.style = {
                color: "red"
            };

            this._contexts.forEach(function (context)
            {
                context.update();
            });
        }

        hasChildren()
        {
            return (this.childrenKeys.length > 0);
        }

        displayType()
        {
            return "dropdown";
        }
    }
}
