define(['core/Utils/FileUtils', 'core/Loaders/BaseLoader'], function(FileUtils, BaseLoader) {
	var images = [];

	function ImageLoader() {
		BaseLoader.call(this);
	}

	ImageLoader.prototype = Object.create(BaseLoader.prototype);

	ImageLoader.prototype.load = function(file, callback) {
		return new Promise(function(resolve, reject) {
			var myimage = new Image();
			myimage.src = file;

			myimage.onerror = function() {
				reject(Error("An occured while loading file " + file));
			}

			myimage.onload = function() {
				images.push(myimage);
				resolve(myimage);
			}
		})
		
	}

	ImageLoader.prototype.get = function(name) {
		for(var image in images) {
			var fileName = FileUtils.getFileNameWithExtension(images[image].src);
			if (fileName === name + '.gif')
				return images[image];	
		}

		return null;
	}

	return ImageLoader;
})