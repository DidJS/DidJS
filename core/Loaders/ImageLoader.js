define(['core/Utils/FileUtils'], function(FileUtils) {
	
	return function ImageLoader() {
		this.load = function(file, callback) {
			return new Promise(function(resolve, reject) {
				var myimage = new Image();
				myimage.src = file;

				myimage.onerror = function() {
					reject(Error("An occured while loading file " + file));
				}

				myimage.onload = function() {
					resolve(myimage);
				}
			})
			
		}

	}
})