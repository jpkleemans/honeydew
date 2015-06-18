/// <reference path="../../type_definitions/fes/fes.d.ts" />

module Honeydew
{
    export class Context implements Fes.IContext
    {
        private calculationModel;
        private variableRepo:VariableRepository;

        // Backing fields
        private _attributes:any;

        constructor(calculationModel, variableRepo:VariableRepository)
        {
            this.calculationModel = calculationModel;
            this.variableRepo = variableRepo;

            this._attributes = {};

            this.update();
        }

        attributes(attributes?:any):any
        {
            if (typeof attributes === "undefined") {
                return this._attributes;
            }

            this._attributes = attributes; // TODO: maybe unnecessary

            this.calculationModel.setValue(this.calculationModel['hIndex'][0], 0, null, attributes.value == null ? null : parseFloat(attributes.value)); // TODO: 3th param = this._engine
            this.variableRepo.updateAll();
        }

        update()
        {
            this._attributes.value = this.calculationModel.getValue(this.calculationModel['hIndex'][0], 0, null); // TODO: 3th param = this._engine
            this._attributes.required = this.calculationModel.getValue(this.calculationModel['hIndex'][0], 2, null); // TODO: 3th param = this._engine
            this._attributes.entered = this.calculationModel.getValue(this.calculationModel['hIndex'][0], 4, null); // TODO: 3th param = this._engine
            this._attributes.disabled = this.calculationModel.getValue(this.calculationModel['hIndex'][0], 3, null); // TODO: 3th param = this._engine

            this._attributes.style = {
                color: 'green'
            };

            this._attributes.display = this.calculationModel.getValue(this.calculationModel['hIndex'][0], 1, null) ? undefined : 'none'; // TODO: 3th param = this._engine
            this._attributes.width = (this.calculationModel['account'] == 1058) ? '400px' : undefined;
        }
    }
}

