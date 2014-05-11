var DidJS = DidJS || {};

define(['core/Events/EventManager'], function(EventManager) {
	
	function BaseShape(type, properties) {
		this.type = type;
		this.id = properties.id;
		this.position = properties.position;
		this.width = properties.width;
		this.height = properties.height;
		this.filled = properties.filled;
		this.fillStyle = properties.fillStyle;
		
		if (properties.hasOwnProperty('resourceInfo')) {
			this.image = properties.resourceInfo.resource
		}

		this.sourceX = properties.sourceX;
		this.sourceY = properties.sourceY;
		this.animations = properties.animations;
		this.velX = properties.velX;
		this.velY = properties.velY;
		this.visible = true;

		this.eventManager = new EventManager();
	}

	BaseShape.prototype.getShiftValues = function() {
		return {
			shiftX : 0,
			shiftY : 0
		};
	}

	BaseShape.prototype.draw = function(ctx) {

	}

	BaseShape.prototype.when = function(eventName) {
		var e = this.eventManager.add(eventName);
		return {
			then : function(callback) {
				e.register(callback);
			}
		}
	}

	BaseShape.prototype.hasEvent = function(eventName) {
		var e = this.eventManager.getEvent(eventName);
		return e || { do : function(){}};
	}

	return BaseShape;
})