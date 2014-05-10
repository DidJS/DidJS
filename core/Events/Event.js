define(function() {
	function Event(name) {
		this.name = name;
	}

	Event.prototype.register = function(callback) {
		this.action = callback;
	}

	Event.prototype.do = function() {
		var params = [];
		for(var i = 0; i < arguments.length ; i++) {
			params.push(arguments[i]);
		}

		this.action.apply(this, params);
	}

	return Event;
})