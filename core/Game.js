define(['core/Loaders/ResourceLoader', 
	    'core/Shape/ShapeFactory', 
	    'core/Keyboard'], function(ResourceLoader, ShapeFactory, Keyboard) {
	 function Game() {
		var _resourcesInfo = [];
		var resourceLoader = new ResourceLoader();
		var _shapeFactory = new ShapeFactory();

		this.world = null;
		this.register = function(path) {
			return {
				asPathFor : function(resourcesType) {
					var self = this;
					return {
						load : function(fileInfos, callback) {
							var resources = [];
							var nbFiles = fileInfos.length;
							var nbFileProcessed = 0;

							fileInfos.forEach(function(fileInfo) {
								var fullFileName = path + fileInfo.file;
								resourceLoader.get(fullFileName, resourcesType, function(resource, ex) {
									if (ex == null) {
										nbFileProcessed++;
										resources.push({ id : fileInfo.name, resource : resource});
										if (nbFiles === nbFileProcessed) {
											var resource = {
												path : path,
												resources : resources,
												resourceType : resourcesType
											};

											_resourcesInfo.push(resource);
											callback();
										}
									}
									else {
										if (self.onerror) {
											self.onerror(ex.message);
										}
									}
								})
							});

							return self;
						}
					}

					return self;
				}
			}
		}

		this.getResource = function(name) {
			var res = null;
			_resourcesInfo.forEach(function(resourceInfo) {
				resourceInfo.resources.forEach(function(r) {
					if (r.id === name) {
						res = r;
						return;
					}
				})
			})

			return res;
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
					properties.resourceInfo = self.getResource(resourceName);
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
			this.world.tickStopped = true;
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
	}

	return Game;
})