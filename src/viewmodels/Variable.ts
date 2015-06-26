/// <reference path="../repositories/ContextRepository.ts" />
/// <reference path="../repositories/VariableRepository.ts" />

module Honeydew
{
    export class Variable implements IVariable
    {
        private childrenKeys:Array<string>;
        private variableRepo:IVariableRepository;
        private contextRepo:IContextRepository;
        private variableModel;
        private prevQuery:string;

        // Backing fields
        private _key:string;
        private _title:string;
        private _attributes:any;
        private _children:Array<IVariable>;
        private _contexts:Array<IContext>;

        constructor(key:string,
                    childrenKeys:Array<string>,
                    variableRepo:IVariableRepository,
                    contextRepo:IContextRepository,
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
        }

        children():Array<IVariable>
        {
            if (this._children.length === 0) {
                this._children = this.variableRepo.findRange(this.childrenKeys);
            }

            return this._children;
        }

        contexts(query:any = null):Array<IContext>
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
        }

        hasChildren()
        {
            return (this.childrenKeys.length > 0);
        }

        displayType()
        {
            // TODO: get displaytype from engine
            return "dropdown";
        }
    }
}
