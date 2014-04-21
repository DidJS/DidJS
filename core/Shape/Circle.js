define(['core/Shape/BaseShape', 'core/Renderers/ShapeRenderer'], function(BaseShape, ShapeRenderer) {
	
	function Circle(id, x, y, radius, filled, fillStyle) {
		this.radius = radius;
		this.width = radius;
		this.height = radius;

		BaseShape.call(this, 'circle', id, x, y, filled, fillStyle);
	}

	Circle.prototype = Object.create(BaseShape.prototype);

	Circle.prototype.getShiftValues = function() {
		return {
			shiftX : this.radius,
			shiftY : this.radius
		};
	}

	Circle.prototype.draw = function(ctx) {
		ShapeRenderer.drawCircle(this, ctx);
	}

	return Circle;
})