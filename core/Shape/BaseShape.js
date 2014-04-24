var DidJS = DidJS || {};

define(function() {
	function BaseShape(type, properties) {
		this.type = type;
		this.id = properties.resourceInfo.id;
		this.position = properties.position;
		this.width = properties.width;
		this.height = properties.height;
		this.filled = properties.filled;
		this.fillStyle = properties.fillStyle;
		this.image = properties.resourceInfo.resource;
		this.sourceX = properties.sourceX;
		this.sourceY = properties.sourceY;
		this.animations = properties.animations;
		this.velX = properties.velX;
		this.velY = properties.velY;
		this.visible = true;
	}

	BaseShape.prototype.getShiftValues = function() {
		return {
			shiftX : 0,
			shiftY : 0
		};
	}

	BaseShape.prototype.draw = function(ctx) {

	}

	return BaseShape;
})