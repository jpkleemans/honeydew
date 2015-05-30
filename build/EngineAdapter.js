function VariableRepository()
{
	this.findByKey = function(key)
	{
		console.info('looking for: ' + key)
		var observers = {};
		return {
			observe : function(event, callback)
			{
				if (observers[event] === undefined)
				{
					observers[event] = [];
				}
				observers[event].push(callback);
			},
			setAttributes : function(attributes)
			{
				var i = observers['change:attributes'].length;
				while (i--)
				{
					observers['change:attributes'][i]();
				}
			},
			getAttributes : function()
			{
				return {
					value : 10,
					style : "color:red;"
				};
			},
			getKey : function()
			{
				return "ROOT";
			},
			getTitle : function()
			{
				return "ROOT";
			},
			getChildren : function()
			{
				return [ {
					observe : function(event, callback)
					{
						if (observers[event] === undefined)
						{
							observers[event] = [];
						}
						observers[event].push(callback);
					},
					setAttributes : function(attributes)
					{
						var i = observers['change:attributes'].length;
						while (i--)
						{
							observers['change:attributes'][i]();
						}
					},
					getAttributes : function()
					{
						return {
							value : 10,
							style : "color:red;"
						};
					},
					getKey : function()
					{
						return "CHILD1";
					},
					getTitle : function()
					{
						return "CHILD1";
					},
					getChildren : function()
					{
						return [];
					},
					getContext : function(query)
					{
						return {
							observe : function(event, callback)
							{
								//
							},
							setAttributes : function(attributes)
							{
								//
							},
							getAttributes : function()
							{
								return {};
							},
							getKey : function()
							{
								return "";
							},
							getTitle : function()
							{
								return "";
							}
						};
					}
				}, {
					observe : function(event, callback)
					{
						if (observers[event] === undefined)
						{
							observers[event] = [];
						}
						observers[event].push(callback);
					},
					setAttributes : function(attributes)
					{
						var i = observers['change:attributes'].length;
						while (i--)
						{
							observers['change:attributes'][i]();
						}
					},
					getAttributes : function()
					{
						return {
							value : 10,
							style : "color:red;"
						};
					},
					getKey : function()
					{
						return "CHILD2";
					},
					getTitle : function()
					{
						return "CHILD2";
					},
					getChildren : function()
					{
						return [];
					},
					getContext : function(query)
					{
						return {
							observe : function(event, callback)
							{
								//
							},
							setAttributes : function(attributes)
							{
								//
							},
							getAttributes : function()
							{
								return {};
							},
							getKey : function()
							{
								return "";
							},
							getTitle : function()
							{
								return "";
							}
						};
					}
				} ];
			},
			getContext : function(query)
			{
				return {
					observe : function(event, callback)
					{
						//
					},
					setAttributes : function(attributes)
					{
						//
					},
					getAttributes : function()
					{
						return {};
					},
					getKey : function()
					{
						return "";
					},
					getTitle : function()
					{
						return "";
					}
				};
			}
		};
	};
}
