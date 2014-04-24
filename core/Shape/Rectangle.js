define(['core/Shape/AABBObject', 'core/Renderers/ShapeRenderer'], function(AABBObject, ShapeRenderer) {
	function Rectangle(properties) {
		AABBObject.call(this, 'rectangle', properties);
	}

	Rectangle.prototype = Object.create(AABBObject.prototype);

	Rectangle.prototype.draw = function(ctx) {
		ShapeRenderer.drawRectangle(this, ctx);
	}

	return Rectangle;
})