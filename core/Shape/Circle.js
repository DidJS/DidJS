define(['core/Shape/BaseShape', 'core/Renderers/ShapeRenderer'], function(BaseShape, ShapeRenderer) {
	
	function Circle(properties) {
		this.radius = properties.radius;
		properties.width = properties.radius;
		properties.height = properties.radius;

		BaseShape.call(this, 'circle', properties);
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