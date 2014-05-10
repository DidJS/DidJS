define(['core/Events/Event'], function(Event) {
	function EventManager() {
		var self = this;
		self.events = [];

		this.getEvent = function(name) {
			var evt = null;
			self.events.forEach(function(e) {
				if (e.name === name) {
					evt = e;
				}
			});

			return evt;
		}

		this.add = function(name) {
			var evt = this.getEvent(name);
			if (!evt) {
				evt = new Event(name);
				self.events.push(evt);
			}

			return evt;
		}
	}

	return EventManager;
})