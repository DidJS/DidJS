require(['core/didjs'], function(DidJS) {
	var self = this;

	var registeredLevels = DidJS.Game.register('Resources/Arkanodid/').asPathFor('Files');
	var registeredImages = DidJS.Game.register('Resources/Arkanodid/').asPathFor('Images');

	registeredLevels.add([{ name : 'level1', file : 'level1.txt' }]);
	registeredImages.add([{ name : 'ball', file : 'ball.gif' }]);

	DidJS.Game.AssetManager.add(registeredLevels);
	DidJS.Game.AssetManager.add(registeredImages);

	DidJS.Game.AssetManager.onload = function() {
		self.gameInit();
	}

	DidJS.Game.AssetManager.onerror = function(error) {
		alert(error.message);
	}


	this.gameInit = function() {
		DidJS.Game.world = new DidJS.World('mycanvas');
		var width = 400, height = 330;
		var _padSpeed = 7;

		DidJS.Game.world.setBoundariesOnX(0, width);
		DidJS.Game.world.setBoundariesOnY(0, height);

		var padWidth = 50, padHeight = 10;

		var posPadX = (width / 2) - (padWidth / 4) - 20;
		var posPadY = height - 5;

		var brickWidth = 40;
		var brickHeight = 20;

		var pad = DidJS.Game.create('rectangle').withProperties({
			position : new DidJS.Vector(posPadX, posPadY),
			width : padWidth,
			height : padHeight,
			velX : 1,
			velY : 1,
			filled : true,
			fillStyle : "red"
		})

		pad.id = 'mypad';

		var ball = DidJS.Game.create('circle').withProperties({
			position : new DidJS.Vector(200, 100),
			radius : 4,
			velX : 1,
			velY : 1,
			filled : true,
			fillStyle : "black"
		});


		var _bricks = null;
		
		var boxx = 2;
		var boxy = 10;

		var level1 = DidJS.Game.AssetManager.getResource('level1');
		if (level1 != null) {
			var createBrick = function(value, x, y) {
				var brick = DidJS.Game.create('rectangle').withProperties({
					position : new DidJS.Vector(boxx + (brickWidth * x), boxy + (brickHeight * y)),
					width : brickWidth,
					height : brickHeight,
					filled : true,
					fillStyle : "yellow"
				});

				if (value === "2") {
					brick.fillStyle = 'blue';
				}

				brick.id = 'brick' + x + '_' + y;

				return brick;
			}

			function fillBricks(oData) {
				var level = oData;
				var levels = level.split(/[\r\n]+/);
				var cntBricks = 0;
				_bricks = new Array(levels.length);
				for (var l = 0; l < levels.length; l++) {
					_bricks[l] = new Array(levels[l].length);
					for (var b = 0; b < levels[l].length; b++) {
						if (levels[l][b] == "0") {
							_bricks[l][b] = null;
						}
						else {
							_bricks[l][b] = createBrick(levels[l][b], b, l);
							// if (levels[l][b] != "x") {
							// 	var randomnumber = Math.floor(Math.random() * brickBonus.length);
							// 	if (levels[l][b] >= 2) {
							// 		_bricks[l][b].bonus = new bonus('bonus1', brickBonus[randomnumber], _bricks[l][b].posXInf, _bricks[l][b].posYSup);
							// 		bonuss.push(_bricks[l][b].bonus);
							// 	}
							// 	cntBricks += 1;
							// }
						}
					}
				}
				totalBricks = cntBricks;
			}

			fillBricks(level1.resource);
		}

		var ballCollisionObjects = [pad];

		_bricks.forEach(function(brick) {
			brick.forEach(function(b) {
				if (b !== null) {
					ballCollisionObjects.push(b);
				}
			})
		});

		DidJS.Game.world.setCollisionObjects(ball, ballCollisionObjects);

		var angleX = 2, angleY = -4 /*-4*/;

		ball.onTick = function() {
			this.position.X += 1 * angleX;
			this.position.Y += 1 * angleY;
		}

		ball.onBoundaryCollision = function(boundaryStatus) {
			if (boundaryStatus.onXMin || boundaryStatus.onXMax) {
				angleX *= -1;
			}

			if (boundaryStatus.onYMin) {
				angleY *= -1;
			}

			if (boundaryStatus.onYMax) {
				DidJS.Game.stopTick();
			}
		}

		ball.onCollisionWith = function(object, where) {
			if (where === 'top' || where === 'bottom') {
				angleY *= -1;
				this.position.Y += 1 * angleY;
			}

			if (where === 'right' || where === 'left') {
				angleX *= -1;
				this.position.X += 1 * angleX;
			}

			if (object.id.substring(0, 5) === "brick") {
				DidJS.Game.world.remove(object);
			}
		}

		pad.onBoundaryCollision = function(boundaryStatus) {
			if (boundaryStatus.onXMax){
				this.position.X = width - this.width;
				pad.speed = 0;
			}
			if (boundaryStatus.onXMin){
				this.position.X = 0;
				pad.speed = 0;
			}
		}

		var keyboard = DidJS.Game.createKeyboard().connectTo(pad);

		keyboard.redefineKey('left', function() {
			pad.position.X -= _padSpeed;
		})

		keyboard.redefineKey('right', function() {
			pad.position.X += _padSpeed;
		})

		keyboard.redefineKey('up', function() {

		})

		keyboard.redefineKey('down', function() {

		})

		DidJS.Game.world.add(ball);
		DidJS.Game.world.add(pad);
		_bricks.forEach(function(brick) {
			brick.forEach(function(b) {
				if (b !== null) {
					DidJS.Game.world.add(b);
				}
			})
		})

		DidJS.Game.world.render();
	}

	DidJS.Game.AssetManager.loadAsync();
})