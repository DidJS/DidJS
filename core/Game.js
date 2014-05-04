define(['core/Shape/ShapeFactory', 
	    'core/Keyboard',
	    'core/Assets/AssetManager',
	    'core/Assets/AssetResource'], function(ShapeFactory, Keyboard, AssetManager, AssetResource) {
	 function Game() {
		var _shapeFactory = new ShapeFactory();
		this.AssetManager = new AssetManager();
		this.scene = null;
		this.register = function(path) {
			return {
				for : function(resourcesType) {
					return new AssetResource(path, resourcesType);
				}
			}
		}

		this.create = function(shape) {
			return {
				withProperties : function(properties) {
					return _shapeFactory.create(shape, properties);
				}
			}
		}

		this.createGameObject = function(resourceName, shapeType) {
			var self = this;
			return {
				withProperties : function(properties) {
					properties.resourceInfo = DidJS.Game.Assets.getResource(resourceName);
					properties.sourceX = 0;
					properties.sourceY = 0;
					return _shapeFactory.create(shapeType, properties);
				}
			}
		}

		this.createKeyboard = function(keys) {
			return new Keyboard(keys);
		}

		this.initializeAnimations = function(animations) {
			var self = this;
			return {
				to : function(gObject) {
					if (!gObject.animations) {
						gObject.animations = [];
					}

					animations.forEach(function(a) {
						a.binded = false;
						gObject.animations.push(a);
						DidJS.AnimationManager.add(gObject, a);
					})

					
				}
			}
		}

		this.stopTick = function() {
			this.scene.tickStopped = true;
		}

		this.setAnimation = function(animationName, animate) {
			var self = this;
			return {
				to : function(gObject) {
					gObject.animations.forEach(function(animation) {
						if (animation.key === animationName) {
							gObject.animation = animation;
							gObject.animation.active = animate;
						}
					})
				}
			}
		}

		this.render = function(scene) {
			scene.render();
		}
	}

	return Game;
})