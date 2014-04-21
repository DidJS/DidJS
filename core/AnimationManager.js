define(function() {
	function AnimationManager() {
		this._animatedObjects = [];
	}

	AnimationManager.prototype.add = function(gObject, animation) {
		if (!this.isAnimatedObject(gObject)) {
			this._animatedObjects[gObject.id] = [];
		}

		var animationObject = {
			key : animation.key,
			timeBetweenFrames : 1 / animation.fps,
			timeSinceLastFrame : new Date().getTime(),
			currentDisplayedFrame : animation.frameStart,
			totalFrames : (animation.frameEnd - animation.frameStart) + 1,
			setCurrentDisplayedFrame : function() {
				++this.currentDisplayedFrame;
				if (this.currentDisplayedFrame > animation.frameEnd) {
					this.currentDisplayedFrame = animation.frameStart;
				}
			}
		}

		this._animatedObjects[gObject.id].push(animationObject);
	}

	AnimationManager.prototype.isAnimatedObject = function(gObject) {
		var isAnimated = false;
		var animations = this._animatedObjects[gObject.id];
		return !!animations;
	}


	AnimationManager.prototype.animate = function(gObject) {

		var aObject = this._animatedObjects[gObject.id]; 
		var currentAnimation = null;
		if (aObject) {
			aObject.forEach(function(a) {
				if (gObject.animation.active && a.key === gObject.animation.key) {
					currentAnimation = a;
					return;
				}
			})

		}

		var timeExhausted = function(time1, time2) {
			return time1 >= time2;
		}

		var getCurrentTime = function() {
			return new Date().getTime();
		}

		if (currentAnimation) {
			gObject.sourceX = 0;
	        //gObject.width = gObject.image.width / currentAnimation.totalFrames;

			//if (aObject.baseObject.animated) {
	        gObject.sourceX = gObject.width * currentAnimation.currentDisplayedFrame;
			//}

			var timeForThisFrame = getCurrentTime();
	        var timeDiff = (timeForThisFrame - currentAnimation.timeSinceLastFrame) / 1000;
	        
	        if (timeExhausted(timeDiff, currentAnimation.timeBetweenFrames))
	        {
	           currentAnimation.setCurrentDisplayedFrame();
	           currentAnimation.timeSinceLastFrame = getCurrentTime();
	        }
		}
	}


	return AnimationManager;
})