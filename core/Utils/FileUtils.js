define(function() {
	function getFileNameWithExtension(fullFileName, delimiter) {
		var splitString = fullFileName.split(delimiter);
		if (splitString.length === 2) {
			return splitString[1];
		}

		return null;
	}

	return { getFileNameWithExtension : getFileNameWithExtension}
})