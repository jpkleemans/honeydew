function VariableRepository() {
    this.findByKey = function (key) {
        var observers = {};

        return {
            observe: function (event, callback) {
                if (observers[event] === undefined) {
                    observers[event] = [];
                }

                observers[event].push(callback);
            },
            setAttributes: function (attributes) {
                var i = observers['change:attributes'].length;
                while (i--) {
                    observers['change:attributes'][i]();
                }
            },
            getAttributes: function () {
                return {
                    value: 10,
                    style: "color:red;"
                };
            },
            getKey: function () {
                return "";
            },
            getTitle: function () {
                return "";
            },
            getChildren: function () {
                return [];
            },
            getContext: function (query) {
                return {
                    observe: function (event, callback) {
                        //
                    },
                    setAttributes: function (attributes) {
                        //
                    },
                    getAttributes: function () {
                        return {};
                    },
                    getKey: function () {
                        return "";
                    },
                    getTitle: function () {
                        return "";
                    }
                };
            }
        };
    };
}

