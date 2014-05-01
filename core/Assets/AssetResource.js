define(function() {
	function AssetResource(path, resourcesType) {
		var resources = [];
		this.path = path;
		this.resourcesType = resourcesType;

		this.getResources = function() {
			return resources;
		}

		this.add = function(currentResources) {
			currentResources.forEach(function(r) {
				resources.push(r);
			})
		}
	}

	return AssetResource;
})