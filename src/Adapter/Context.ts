/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class Context implements Fes.IContext
    {
        private column;
        private variableModel;

        // Backing fields
        private _attributes:any;

        constructor(column:any, variableModel)
        {
            this.column = column;
            this.variableModel = variableModel;

            this._attributes = {};

            this.update();
        }

        attributes(attributes?:any):any
        {
            if (typeof attributes === "undefined") {
                return this._attributes;
            }

            this._attributes = attributes; // TODO: maybe unnecessary

            this.variableModel.setValue(this.variableModel['hIndex'][0], 0, this.column, attributes.value == null ? null : parseFloat(attributes.value));
            //this.variableRepo.updateAll();
        }

        update()
        {
            //this._attributes.value = this.variableModel.getValue(this.variableModel['hIndex'][0], 0, null); // TODO: 3th param = this._engine
            //this._attributes.required = this.variableModel.getValue(this.variableModel['hIndex'][0], 2, null); // TODO: 3th param = this._engine
            //this._attributes.entered = this.variableModel.getValue(this.variableModel['hIndex'][0], 4, null); // TODO: 3th param = this._engine
            //this._attributes.disabled = this.variableModel.getValue(this.variableModel['hIndex'][0], 3, null); // TODO: 3th param = this._engine
            //
            //this._attributes.style = {
            //    color: 'green'
            //};
            //
            //this._attributes.display = this.variableModel.getValue(this.variableModel['hIndex'][0], 1, null) ? undefined : 'none'; // TODO: 3th param = this._engine
            //this._attributes.width = (this.variableModel['account'] == 1058) ? '400px' : undefined;
        }
    }
}

