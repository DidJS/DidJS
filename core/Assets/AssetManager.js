var DidJS = DidJS || {};

define(['core/Loaders/ImageLoader', 'core/Loaders/FileLoader'], function(ImageLoader, FileLoader) {
	
	function AssetManager() {
		this._imgLoader = new ImageLoader();
		this._fileLoader = new FileLoader();

		var _assetResources = [];
		var _resourcesInfo = [];
		var totalFiles = 0;
		var self = this;

		function executeLoader(name, type) {
			return new Promise(function(resolve, reject) {
				var loader = null;

				if (type === 'Images') {
					loader = self._imgLoader;
				}
				else if (type === 'Files') {
					loader = self._fileLoader;
				}

				if (loader) {
					loader.load(name).then(function(result) {
						resolve(result);
					}, function(error) {
						reject(error);
					});
				}
				else {
					reject(Error("loader unknown : " + type));
				}
			})
		}

		this.add = function(assetResource) {
			_assetResources.push(assetResource);
			totalFiles += assetResource.getResources().length;
		}

		this.loadAsync = function() {
			return new Promise(function(resolve, reject) {
				var resources = [];
				var nbTotalFilesProcessed = 0;

				_assetResources.forEach(function(aResource) {
					var nbFileProcessed = 0;
					var nbFiles = aResource.getResources().length;
					aResource.getResources().forEach(function(resource) {
						var fullFileName = aResource.path + resource.file;
						executeLoader(fullFileName, aResource.resourcesType).then(function(result) {
							nbFileProcessed++;
							nbTotalFilesProcessed++;

							resources.push({ id : resource.name, resource : result});
							if (nbFiles === nbFileProcessed) {
								_resourcesInfo.push({
									path : aResource.path,
									resources : resources,
									resourceType : aResource.resourcesType
								});
							}

							if (totalFiles === nbTotalFilesProcessed) {
								resolve();
							}
						}, function(error) {
							reject(error);
						})
					})
					
				});
			})
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
	}

	return AssetManager;
})