define(['core/Shape/BaseShape'], function(BaseShape) {
	function AABBObject(type, properties) {
		BaseShape.call(this, type, properties);
	}

	AABBObject.prototype = Object.create(BaseShape.prototype);

	return AABBObject;
})