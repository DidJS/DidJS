var DidJS = DidJS || {};

define(['core/Renderers/Renderer',
	    'core/Collider/Collider'], function(Renderer, Collider) {
	DidJS.World = function(canvasName, width, height) {
		var self = this;
		var _boundaryOnXMin, _boundaryOnXMax, _boundaryOnYMin, _boundaryOnYMax;
		var _renderer;
		var _worldObjects = [];
		var _collider = new Collider(_worldObjects);
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
				_worldObjects.splice(o.index, 1);
			})

			_objectsToRemove = [];
		}

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {
				if (obj.onTick) {
					obj.onTick();
				}

				if (obj.keyboard) {
					obj.keyboard.stroke();
				}

				var boundaryStatus = self.getBoundariesStatusFor(obj);
				if (boundaryStatus.onXMin || boundaryStatus.onXMax || boundaryStatus.onYMin || boundaryStatus.onYMax) {
					if (obj.onBoundaryCollision) {
						obj.onBoundaryCollision(boundaryStatus);
					}
				}

				var collisionObjects = _collisionObjects[obj.id];
				if (collisionObjects && obj.onCollisionWith) {
					collisionObjects.forEach(function(cObject) {
						if (obj.type === 'circle') {
							var collisionResult = _collider.circleCollision(cObject, obj);
							if (collisionResult !== '') {
						    	obj.onCollisionWith(cObject, collisionResult);
							}
						}
						else {
							if (_collider.collisionBetweenAABBs(cObject, obj)) {
								obj.onCollisionWith(cObject);
							}

						}
					});

					removeChildrenObjects(obj);
				}

				 DidJS.AnimationManager.animate(obj);
				 _renderer.draw(obj);

			});

			removeObjects();

			if (!self.tickStopped) {
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
			_worldObjects.push(gameObject);
		}

		this.remove = function(gameObject) {
			var i = _worldObjects.indexOf(gameObject);
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


	return DidJS.World;
})