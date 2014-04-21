define(['core/Utils/FileUtils'], function(FileUtils) {
	var images = [];

	function ImageLoader() {
	}

	ImageLoader.prototype.load = function(file, callback) {

		var myimage = new Image();
		myimage.src = file;

		myimage.onerror = function() {
			callback(null, { message : "Erreur au chargement de l'image " + file });
		}

		myimage.onload = function() {
			images.push(myimage);
			callback(myimage, null);
		}
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