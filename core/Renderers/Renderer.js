define(function() {
	function Renderer(viewName, width, height) {
		var canvas = document.getElementById(viewName);
		var ctx = canvas.getContext('2d');

		this.draw = function(obj) {
			obj.draw(ctx);
		}

		this.clearScene = function() {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
	}

	return Renderer;
})