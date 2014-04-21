define(['core/Shape/AABBObject', 'core/Renderers/ShapeRenderer'], function(AABBObject, ShapeRenderer) {
	function Square(id, x, y, side, filled, fillStyle) {
		this.side = side;
		AABBObject.call(this, 'square', id, x, y, filled, fillStyle);
	}

	Square.prototype = Object.create(AABBObject.prototype);

	Square.prototype.draw = function(ctx) {
		ShapeRenderer.drawSquare(this, ctx);
	}
	
	return Square;
})