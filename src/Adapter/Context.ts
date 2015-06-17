/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class Context implements Fes.IContext
    {
        private _key:string;
        private _title:string;
        private _attributes:any;
        private _instancevariable: any;
        private _engine: any;
        private _variables: VariableRepository;

        constructor(instancevariable: any, engine: any, variables: VariableRepository)
        {
            this._instancevariable = instancevariable;
            this._engine = engine;
            this._variables = variables;
        }

        key():string
        {
            return this._key;
        }

        title():string
        {
            return this._title;
        }

        attributes(attributes:any = null):any
        {
            if (attributes === null) {
                return this._attributes;
            }
            this._instancevariable.setValue(this._instancevariable.hIndex[0], 0, this._engine, attributes.value == null ? null : parseFloat(attributes.value));

            this._variables.updateAll();

            this._attributes = attributes;
        }

        update()
        {
            this._attributes.value = this._instancevariable == undefined ? 0 : this._instancevariable.getValue(this._instancevariable.hIndex[0], 0, this._engine);
            this._attributes.required = this._instancevariable == undefined ? 0 : this._instancevariable.getValue(this._instancevariable.hIndex[0], 2, this._engine);
            this._attributes.entered = this._instancevariable == undefined ? 0 : this._instancevariable.getValue(this._instancevariable.hIndex[0], 4, this._engine);
            this._attributes.disabled = this._instancevariable == undefined ? 0 : this._instancevariable.getValue(this._instancevariable.hIndex[0], 3, this._engine);

            this._attributes.style = {
                color: 'green',
                display: this._instancevariable.getValue(this._instancevariable.hIndex[0], 1, this._engine) ? undefined : 'none',
                //just add some dynamics..
                width: (this._instancevariable.account == 1058) ? '400px' : undefined
            }
        }
    }
}

