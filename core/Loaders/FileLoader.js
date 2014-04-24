define(function() {

	function FileLoader() {
	}

	FileLoader.prototype.load = function(file, callback) {
		var xhr = getXMLHttpRequest();
		try {
			if (xhr != null) {
				var r = document.URL.split('/');
				var level = document.URL.replace(r[r.length - 1], '') + file;
				xhr.open("GET", level, false);
				xhr.send(""); 
				
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
					callback(xhr.responseText, null);
				}
			}
			else {
				callback(null, { message : 'Your browser does not support XMLHttpRequest object' });
			}
		}
		catch (e) {
			callback(null, e);
		}
	}

	function getXMLHttpRequest() {
		var xhr = null;
		 
		if (window.XMLHttpRequest || window.ActiveXObject) {
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
			} else {
				xhr = new XMLHttpRequest(); 
			}
		} else {
			return null;
		}
		 
		return xhr;
	}

	return FileLoader;
})