define(['core/Shape/BaseShape', 'core/Renderers/ShapeRenderer'], function(BaseShape, ShapeRenderer) {
	function Text(properties) {
		BaseShape.call(this, 'text', properties);
	}

	Text.prototype = Object.create(BaseShape.prototype);

	Text.prototype.draw = function(ctx) {
		ShapeRenderer.drawText(this, ctx);
	}

	return Text;
})