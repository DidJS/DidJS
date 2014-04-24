define(['core/Shape/AABBObject', 'core/Renderers/ShapeRenderer'], function(AABBObject, ShapeRenderer) {
	function Square(properties) {
		this.side = properties.side;
		properties.width = properties.side;
		properties.height = properties.side;

		AABBObject.call(this, 'square', properties);
	}

	Square.prototype = Object.create(AABBObject.prototype);

	Square.prototype.draw = function(ctx) {
		ShapeRenderer.drawSquare(this, ctx);
	}
	
	return Square;
})