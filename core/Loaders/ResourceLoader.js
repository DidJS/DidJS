define(['core/Loaders/ImageLoader', 'core/Loaders/FileLoader'], function(ImageLoader, FileLoader) {
	var loaders = [];
	function ResourceLoader() { 
		this._imgLoader = new ImageLoader();
		this._fileLoader = new FileLoader();
	}

	ResourceLoader.prototype.getAll = function(files, type, callback)  {
		var self = this;
		var nbFiles = files.length;
		var nbFilesProcessed = 0;
		if (type === 'Images') {
			var images = [];
			files.forEach(function(file) {
				self._imgLoader.load(file, function(img, e) {
					if (img) {
						images.push(img);
						nbFilesProcessed++;
						if (nbFilesProcessed === nbFiles) {
							callback(images, e);
						}
					}
					else {
						callback(null, e);
						return;
					}
				});
			})
		}
		if (type === 'Files') {
			var contents = [];
			files.forEach(function(file) {
				self._fileLoader.load(file, function(content, e) {
					if (content) {
						contents.push(content);
						nbFilesProcessed++;
						if (nbFilesProcessed === nbFiles) {
							callback(contents, e)
						}
					}
					else {
						callback(null, e);
					}
				})
			})
		}
	}

	ResourceLoader.prototype.get = function(name, type, callback) {
		var resource = null;

		if (type === 'Images') {
			this._imgLoader.load(name, callback);
		}
		else if (type === 'Files') {
			this._fileLoader.load(name, callback);
		}
		
		return resource;
	}

	return ResourceLoader;
})