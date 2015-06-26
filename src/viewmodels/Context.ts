module Honeydew
{
    export class Context implements IContext
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

        /**
         * Get or set HTML attributes
         *
         * @param attributes
         * @returns {any}
         */
        attributes(attributes?:any):any
        {
            if (typeof attributes === "undefined") {
                return this._attributes;
            }

            this._attributes = attributes; // TODO: maybe unnecessary
        }

        /**
         * Get HTML display type
         *
         * @returns {string}
         */
        displayType()
        {
            // TODO: get displaytype from engine
            return "input";
        }

        /**
         * Update attributes
         */
        update()
        {
            this._attributes.value = (value) =>
            {
                if (typeof value === "undefined") {
                    return this.variableModel.getValue(this.variableModel['hIndex'][0], 0, this.column);
                }

                this._attributes.entered = "true";

                this.variableModel.setValue(this.variableModel['hIndex'][0], 0, this.column, value == undefined ? null : value);
            };

            this._attributes.required = this.variableModel.getValue(this.variableModel['hIndex'][0], 2, this.column);
            this._attributes.entered = this.variableModel.getValue(this.variableModel['hIndex'][0], 4, this.column);
            this._attributes.disabled = this.variableModel.getValue(this.variableModel['hIndex'][0], 3, this.column);

            this._attributes.style = {
                color: 'green'
            };

            this._attributes.display = this.variableModel.getValue(this.variableModel['hIndex'][0], 1, this.column) ? undefined : 'none';
            this._attributes.width = (this.variableModel['account'] == 1058) ? '400px' : undefined;
        }
    }
}

