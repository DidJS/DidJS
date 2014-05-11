define([
		'core/Renderers/ShapeRenderer', 
		'core/Shape/Circle', 
		'core/Shape/Rectangle', 
		'core/Shape/Square', 
		'core/Shape/Text'], function(ShapeRenderer, Circle, Rectangle, Square, Text) {
	function ShapeFactory() {

		this.create = function(shape, properties) {
			if (!properties.hasOwnProperty('id')) {
				properties.id = shape;
			}

			if (!properties.animations){
				properties.animations = [];
			}

			if (shape === 'circle') {
				return createCircle(properties);
			}
			else if (shape === 'square') {
				return createSquare(properties);
			}
			else if (shape === 'rectangle') {
				return createRectangle(properties);
			}
			else if (shape === 'text') {
				return createText(properties);
			}
			else {
				throw 'Shape ' + shape + ' unknown';
			}
		}

		var createCircle = function(properties) {
			var circle = new Circle(properties);

			return circle;
		}

		var createSquare = function(properties) {
			var square = new Square(properties);

			return square;
		}

		var createRectangle = function(properties) {
			var rectangle = new Rectangle(properties);

			return rectangle;
		}

		var createText = function(properties) {
			var text = new Text(properties);

			return text;
		}
	}

	return ShapeFactory;
	
})