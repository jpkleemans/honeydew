/**
 * TODO: add formula per variable Frequency<br>
 * TODO: add Frequency switcher<br>
 * TODO: fix hIndex object<br>
 * 9bit 256 columns 8bit 8/8 tuple/nested 6bit 32 properties 28bits...total 5bit tweaking... Variable.values description;<br>
 * 5bits for 16timelines,<br>
 * er is nog niet negedacht over Scenario/Optie tijdlijn combinaties, alle 15 additionele tijdlijnen zijn op dit moment optie-tijdlijnen.<br>
 * 9bits for 256columns,<br>
 * 4bits for first level tuples(8),<br>
 * 4bits for nested tuples(8),<br>
 * 5bits for properties? InputRequired,Visible,Locked(*formulasets)+aggrgation<br>
 * 28 bit total, 4 bits left for tweaking(maybe 16*16tuples(+2bit..), more columns? more timelines..)<br>
 * zo blijft het staatvolle/staatloze gedeelte van elkaar gescheiden en kunnen verschillende scripts dezelfde data delen.
 */
function CalculationModel(modelData)
{
	this._modelName = modelData.modelName;
	this._startCalculationTime = new Date().getTime();
	this._calculationRound = 0;
	this._calculations = 0;
	this._lookups = 0;
	this._vars = [];
	var formulasets = modelData.formulasets.length;
	this._reset = function()
	{
		this._calculations = 0;
		this._lookups = 0;
		this._startCalculationTime = new Date().getTime();
	};
	this._newCalculationRound = function()
	{
		this._reset();
		this._calculationRound++;
	}
	this._log = function(variable, t, newValue)
	{// NO-OP implementation
	};
	function addVariable(vars, model, variable)
	{
		variable._calculationRound = 0;
		variable._newCalculationRound = function()
		{
			// When a variable is requested for a new calculation round, it will reverse recursive call all references to be re-calculated aswell.
			variable.values = {};
			// TODO: use array instead of hashMap
			for (v in variable.references)
			{
				variable.references[v].values = {};
			}
		}
		variable.values = [];// new Array(268435456); new Array 700ms slower... when doing getValues...
		variable.evalues = [];
		variable.getValue = function(hIndex, f, T)
		{
			model._lookups++;
			// if (T == undefined || T.t == undefined || hIndex == undefined || hIndex.ti == undefined || f == undefined || f < 0 || T.t < 0)
			// {
			// throw Error("T:[" + T + "] hIndex:[" + hIndex + "] fIndex: [" + f + "]");
			// }
			var t;
			var lookupValue;
			var prevTl = T.prevTl;
			// the next loop is used to provide Option logic. Because its in the engine all variables will be part of the option logic
			// Move this to Variable decorator instead, then variables can decide if they want to participate option logic.
			// Notice, when using this, it will evaluate the formula for the other timelines aswell, this could lead to significant performance loss. But it does cashes the values once
			// retrieved.
			var evalues = this.evalues;
			if (f == 0 && evalues.length > 0)
			{
				while (prevTl != undefined)
				{
					t = hIndex.ti + (f * 2048) + prevTl.t;
					lookupValue = evalues[t];
					if (lookupValue !== undefined)
					{
						return lookupValue;
					}
					prevTl = prevTl.prevTl;
				}
				t = hIndex.ti + (f * 2048) + T.t;
				lookupValue = evalues[t];
				if (lookupValue !== undefined)
				{
					// return entered value
					return lookupValue;
				}
			}
			else
			{
				t = hIndex.ti + (f * 2048) + T.t;
			}
			var values = this.values;
			lookupValue = values[t];
			if (lookupValue === undefined)// null!==undefined
			{
				// when recurring loops, this should prevent it
				values[t] = NA;
				model._calculations++;
				lookupValue = variable.decorator(T.calc(variable, vars, hIndex, f));
				// if (typeof lookupValue === 'object')
				// {
				// // console.info(lookupValue);
				// // console.info(variable.name);
				// console.trace()
				//				}
				values[t] = lookupValue;
			}
			return lookupValue;
		};
		variable.setValue = function(hIndex, fIndex, T, newValue)
		{
			var t = hIndex.ti + T.t + (fIndex * 2048);
			model._newCalculationRound();
			variable._newCalculationRound();
			model._log(variable, t, newValue);
			if ((newValue == "") || (newValue == null))
			{
				delete variable.evalues[t];
			}
			else
			{
				variable.evalues[t] = newValue;
			}
		};
	}
	var variables = modelData.variables;
	for (var i = 0; i < variables.length; i++)
	{
		var variable = variables[i];
		this._vars[i] = variable;
		variable.hIndex = [];
		variable.maxTuplecount = 8;
		variable.removeTuple = function()
		{
			// add logic to remove all setValues in this range.. to keep the document clean
			this.hIndex.length = (this.hIndex.length - 1);
		}
		variable.addTuple = function()
		{
			if (this.hIndex.length < this.maxTuplecount)
			{
				var tuplecount = this.hIndex.length;
				var newTupleContext = {
					ti : (tuplecount * 32768)
				};
				this.hIndex.push(newTupleContext);
				return newTupleContext;
			}
			return undefined;
		}
		variable.addTuple();
		addVariable(this._vars, this, variable);
		this[variable.name] = variable;
	}
}
if (typeof require == 'function')
{
	exports.CalculationModel = CalculationModel;
}