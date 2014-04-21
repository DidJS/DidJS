var DidJS = DidJS || {};

define(function() {
	var _gameObjects = [];
	

	function Collider(gameObjects) {
		_gameObjects = gameObjects;

		var getBoundingBoxFor = function(circle) {
			var bb = getCoordonnatesMinAndMaxFor(circle);
			bb.width = circle.width;
			bb.height = circle.height;
			return bb;
		}

		var getCoordonnatesMinAndMaxFor = function(aabb) {
			return {
				xMin : aabb.position.X,
				xMax : aabb.position.X + aabb.width,
				yMin : aabb.position.Y,
				yMax : aabb.position.Y + aabb.height
			}
		}

		this.collideWithBorders = function(borderXMin, borderXMax, borderYMin, borderYMax, obj) {
			var whichBoundary = {
				onXMin : false,
				onYMin : false,
				onXMax : false,
				onYMax : false
			}

			if (obj.position.X - obj.getShiftValues().shiftX < borderXMin) {
				whichBoundary.onXMin = true;
			}

			if (obj.position.X + obj.width > borderXMax) {
				whichBoundary.onXMax = true;
			}

			if (obj.position.Y - obj.getShiftValues().shiftY < borderYMin) {
				whichBoundary.onYMin = true;
			}

			if (obj.position.Y + obj.height > borderYMax) {
				whichBoundary.onYMax = true;
			}

			return whichBoundary;
		}

		this.collisionBetweenAABBs = function(aabb1, aabb2) {
			var coordonatesAABB1 = getCoordonnatesMinAndMaxFor(aabb1);
			var coordonatesAABB2 = getCoordonnatesMinAndMaxFor(aabb2);

		    if((coordonatesAABB2.xMin >= coordonatesAABB1.xMax) 
			|| (coordonatesAABB2.xMax <= coordonatesAABB1.xMin) 
			|| (coordonatesAABB2.yMin >= coordonatesAABB1.yMax) 
			|| (coordonatesAABB2.yMax <= coordonatesAABB1.yMin))  
		          return false; 
		    else
		          return true; 
		}

		this.collisionBetweenPointAndCircle = function(x, y, circle) {
		   var d2 = (x - circle.position.X) * (x - circle.position.X) + (y - circle.position.Y) * (y - circle.position.Y);
		   if (d2 > circle.radius * circle.radius)
		      return false;
		   else
		      return true;

		}

		this.collisionBetweenPointAndAABB = function(x, y, aabb) {
			var coordonatesAABB = getCoordonnatesMinAndMaxFor(aabb);

		   if (x >= coordonatesAABB.xMin 
		    && x < coordonatesAABB.xMax
		    && y >= coordonatesAABB.yMin 
		    && y < coordonatesAABB.yMax)
		       return true;
		   else
		       return false;

		}

		this.circleCollision = function(cObject, circle) {
			var circleAABB = getBoundingBoxFor(circle);

			if (!this.collisionBetweenAABBs(cObject, circle)) {
				return '';
			}

			var coordonatesObject = getCoordonnatesMinAndMaxFor(cObject);

			if (this.collisionBetweenPointAndCircle(coordonatesObject.xMin, coordonatesObject.yMin, circle) ||
				this.collisionBetweenPointAndCircle(coordonatesObject.xMax, coordonatesObject.yMax, circle)) {
				return 'bottom';
			}

			if (this.collisionBetweenPointAndCircle(coordonatesObject.xMax, coordonatesObject.yMin, circle) ||
				this.collisionBetweenPointAndCircle(coordonatesObject.xMin, coordonatesObject.yMax, circle)) {
				return 'top';
			}


			if (circle.position.Y - cObject.position.Y > 0 && 
			 	circle.position.Y <= cObject.position.Y + cObject.height &&
		    	 Math.abs(cObject.position.X - circle.position.X) < circle.radius) {
		    		return 'left';
		    }

		    if (circle.position.Y - cObject.position.Y > 0 && 
			 	circle.position.Y - circle.radius <= cObject.position.Y + cObject.height &&
		    	 Math.abs(cObject.position.X + cObject.width - circle.position.X) < circle.radius) {
		    		return 'right';
		    }

			if (circle.position.Y - cObject.position.Y < 0 && 
				circle.position.Y + circle.radius >= cObject.position.Y &&
				(circle.position.X - circle.radius <= cObject.position.X + cObject.width && circle.position.X + circle.radius >= cObject.position.X)) {
					return 'top';
			}

			if (circle.position.Y - circle.radius - cObject.position.Y > 0 &&
				circle.position.Y - circle.radius <= cObject.position.Y + cObject.height &&
				(circle.position.X - circle.radius <= cObject.position.X + cObject.width && circle.position.X + circle.radius >= cObject.position.X)) {
					return 'bottom';	
			}
			
			return '';
		}
	}


	return Collider;
})