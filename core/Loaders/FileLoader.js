define(function() {

	function FileLoader() {
	}

	FileLoader.prototype.load = function(file, callback) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", file);

			xhr.onload = function() {
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
		 			resolve(xhr.responseText);
				}
				else {
					reject(Error("An occured while loading file " + file + ". Status : " + xhr.statusText));
				}
			}

			xhr.onerror = function() {
				reject(Error("An occured while loading file " + file + ". Status : " + xhr.statusText));
			}

			xhr.send(); 
		})
	}

	return FileLoader;
})