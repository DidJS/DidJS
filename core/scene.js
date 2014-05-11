var DidJS = DidJS || {};

define(['core/Renderers/Renderer',
	    'core/Collider/Collider'], function(Renderer, Collider) {
	DidJS.Scene = function(canvasName, width, height) {
		var self = this;
		var _boundaryOnXMin, _boundaryOnXMax, _boundaryOnYMin, _boundaryOnYMax;
		var _renderer;
		var _sceneObjects = [];
		var _collider = new Collider(_sceneObjects);
		var _collisionObjects = [];
		var _objectsToRemove = [];
		this.tickStopped = false;

		_renderer = new Renderer(canvasName, width, height);

		this.getBoundariesStatusFor = function(obj) {
			return _collider.collideWithBorders(_boundaryOnXMin, _boundaryOnXMax, _boundaryOnYMin, _boundaryOnYMax, obj);
		}

		var removeChildrenObjects = function(parentObject) {
			var objs = _collisionObjects[parentObject.id];
			_objectsToRemove.forEach(function(or) {
				var i = -1;
				var j = 0;
				objs.forEach(function(po) {
					if (po.id === or.item.id) {
						i = j;
						return;
					}
					j++;
				})

				objs.splice(i, 1);
			})
		}

		var removeObjects = function() {
			_objectsToRemove.forEach(function(o) {
				_sceneObjects.splice(o.index, 1);
			})

			_objectsToRemove = [];
		}

		var gameLoop = function() {
			if (!self.tickStopped) {
				_renderer.clearScene();
				_sceneObjects.forEach(function(obj) {
					obj.hasEvent('onTick').do();

					if (obj.keyboard) {
						obj.keyboard.stroke();
					}

					var boundaryStatus = self.getBoundariesStatusFor(obj);
					if (boundaryStatus.onXMin || boundaryStatus.onXMax || boundaryStatus.onYMin || boundaryStatus.onYMax) {
						obj.hasEvent('onBoundaryCollision').do(boundaryStatus);
					}

					var collisionObjects = _collisionObjects[obj.id];
					if (collisionObjects) {
						collisionObjects.forEach(function(cObject) {
							if (obj.type === 'circle') {
								var collisionResult = _collider.circleCollision(cObject, obj);
								if (collisionResult !== '') {
							    	obj.hasEvent('onCollisionWith').do(cObject, collisionResult);
								}
							}
							else {
								if (_collider.collisionBetweenAABBs(cObject, obj)) {
									obj.hasEvent('onCollisionWith').do(cObject);
								}

							}
						});

						removeChildrenObjects(obj);
					}

					 DidJS.AnimationManager.animate(obj);
					 _renderer.draw(obj);

				});

				removeObjects();

			
				requestAnimationFrame(gameLoop);
			}
		}

		

		this.setCollisionObjects = function(gameObject, collisionObjects) {
			_collisionObjects[gameObject.id] = collisionObjects;
		}

		this.render = function() {
			gameLoop();
		}

		this.add = function(gameObject) {
			_sceneObjects.push(gameObject);
		}

		this.remove = function(gameObject) {
			var i = _sceneObjects.indexOf(gameObject);
			_objectsToRemove.push({index : i, item : gameObject});
		}

		this.setBoundariesOnX = function(min, max) {
			_boundaryOnXMin = min;
			_boundaryOnXMax = max;
		}

		this.setBoundariesOnY = function(min, max) {
			_boundaryOnYMin = min;
			_boundaryOnYMax = max;
		}

		this.getBoundaryOnXMin = function() {
			return _boundaryOnXMin;
		}

		this.getBoundaryOnXMax = function() {
			return _boundaryOnXMax;
		}

		this.getBoundaryOnYMin = function() {
			return _boundaryOnYMin;
		}

		this.getBoundaryOnYMax = function() {
			return _boundaryOnYMax;
		}
	}


	return DidJS.Scene;
})