define(['core/Shape/AABBObject', 'core/Renderers/ShapeRenderer'], function(AABBObject, ShapeRenderer) {
	function Rectangle(id, x, y, width, height, filled, fillStyle) {
		this.width = width;
		this.height = height;

		AABBObject.call(this, 'rectangle', id, x, y, filled, fillStyle);
	}

	Rectangle.prototype = Object.create(AABBObject.prototype);

	Rectangle.prototype.draw = function(ctx) {
		ShapeRenderer.drawRectangle(this, ctx);
	}

	return Rectangle;
})