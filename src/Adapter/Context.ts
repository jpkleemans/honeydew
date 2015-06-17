module Honeydew
{
    export class Context implements Fes.IContext
    {
        private key:string;
        private title:string;
        private attributes:any;
        private instancevariable: any;
        private engine: any;
        private variables: VariableRepository;

        constructor(instancevariable: any, engine: any, variables: VariableRepository)
        {
            this.instancevariable = instancevariable;
            this.engine = engine;
            this.variables = variables;
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
            this.instancevariable.setValue(this.instancevariable.hIndex[0], 0, this.engine, attributes.value == null ? null : parseFloat(attributes.value));

            this.variables.updateAll();

            this.attributes = attributes;
        }

        update()
        {
            this.attributes.value = this.instancevariable == undefined ? 0 : this.instancevariable.getValue(this.instancevariable.hIndex[0], 0, this.engine);
            this.attributes.required = this.instancevariable == undefined ? 0 : this.instancevariable.getValue(this.instancevariable.hIndex[0], 2, this.engine);
            this.attributes.entered = this.instancevariable == undefined ? 0 : this.instancevariable.getValue(this.instancevariable.hIndex[0], 4, this.engine);
            this.attributes.disabled = this.instancevariable == undefined ? 0 : this.instancevariable.getValue(this.instancevariable.hIndex[0], 3, this.engine);

            this.attributes.style = {
                color: 'green',
                display: this.instancevariable.getValue(this.instancevariable.hIndex[0], 1, this.engine) ? undefined : 'none',
                //just add some dynamics..
                width: (this.instancevariable.account == 1058) ? '400px' : undefined
            }
        }
    }
}

