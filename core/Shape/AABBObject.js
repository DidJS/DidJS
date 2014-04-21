define(['core/Shape/BaseShape'], function(BaseShape) {
	function AABBObject(type, id, x, y, filled, fillStyle) {
		BaseShape.call(this, type, id, x, y, filled, fillStyle);
	}

	AABBObject.prototype = Object.create(BaseShape.prototype);

	return AABBObject;
})