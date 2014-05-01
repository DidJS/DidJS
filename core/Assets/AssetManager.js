var DidJS = DidJS || {};

define(['core/Loaders/ImageLoader', 'core/Loaders/FileLoader'], function(ImageLoader, FileLoader) {
	
	function AssetManager() {
		this._imgLoader = new ImageLoader();
		this._fileLoader = new FileLoader();

		var _assetResources = [];
		var _resourcesInfo = [];
		var totalFiles = 0;

		this.get = function(name, type, callback) {
			var loader = null;

			if (type === 'Images') {
				loader = this._imgLoader;
			}
			else if (type === 'Files') {
				loader = this._fileLoader;
			}

			if (loader) {
				loader.load(name).then(function(result) {
					callback(result, null);
				}, function(error) {
					callback(null, error);
				});
			}
			else {
				callback(null, Error("loader unknown : " + type));
			}
		}

		this.add = function(assetResource) {
			_assetResources.push(assetResource);
			totalFiles += assetResource.getResources().length;
		}

		this.loadAsync = function() {
			var resources = [];
			var nbAssetsProcessed = 0;
			var nbAssets = _assetResources.length;
			var nbTotalFilesProcessed = 0;
			var self = this;

			_assetResources.forEach(function(aResource) {
				nbAssetsProcessed++;
				var nbFileProcessed = 0;
				var nbFiles = aResource.getResources().length;
				aResource.getResources().forEach(function(resource) {
					var fullFileName = aResource.path + resource.file;
					self.get(fullFileName, aResource.resourcesType, function(result, error) {
						if (error == null) {
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
								if (self.onload) {
									self.onload();
								}
							}
						}
						else {
							if (self.onerror) {
								self.onerror(error);
							}
							return;
						}
					})
				})
				
			});
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