define(['core/Loaders/ImageLoader', 'core/Loaders/FileLoader'], function(ImageLoader, FileLoader) {
	var loaders = [];
	function ResourceLoader() { 
		this._imgLoader = new ImageLoader();
		this._fileLoader = new FileLoader();
	}

	ResourceLoader.prototype.get = function(name, type, callback) {
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

	return ResourceLoader;
})