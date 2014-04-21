var DidJS = DidJS || {};

define(function() {
	function BaseShape(type, id, x, y, filled, fillStyle) {
		this.type = type;
		this.id = id;
		this.filled = filled;
		this.fillStyle = fillStyle;
		this.position = new DidJS.Vector(x, y);
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