require(['core/didjs'], function(DidJS) {
	var self = this;

	var registeredLevels = DidJS.Game.register('Resources/Arkanodid/').for('Files');
	var registeredImages = DidJS.Game.register('Resources/Arkanodid/').for('Images');

	registeredLevels.add
	(
		[
			{ name : 'level1', file : 'level1.txt' }, 
			{ name : 'level2', file : 'level2.txt' },
			{ name : 'level3', file : 'level3.txt' }
		]
	);

	registeredImages.add
	(
		[
			{ name : 'ball', file : 'ball.gif' },
			{ name : 'background1', file : 'background_level1.gif'},
			{ name : 'background2', file : 'background_level2.gif'},
			{ name : 'background3', file : 'background_level3.gif'}
		]
	);

	DidJS.Game.AssetManager.add(registeredLevels);
	DidJS.Game.AssetManager.add(registeredImages);

	DidJS.Game.AssetManager.loadAsync().then(function(result) {
		gameInit();
	}, function(error) {
		alert(error.message);
	});

	function gameInit() {

		var width = 400, height = 330;

		function menu() {
			var menuScene = new DidJS.Scene('mycanvas');
			var positionSelectorX = (width / 2) - (150 / 4) - 50;
			var positionSelectorY = 130;

			var selector = DidJS.Game.create('circle', {
				id : 'selector',
				position : new DidJS.Vector(positionSelectorX, positionSelectorY),
				radius : 4,
				velX : 0,
				velY : 10,
				filled : true,
				fillStyle : 'red'
			});

			var title = DidJS.Game.create('text', {
				id : 'menuTitle',
				position : new DidJS.Vector((width / 2) - (150 / 4) - 30, 70),
				text : 'Arkanodid',
				font : '25px cursive',
				textColor : 'black',
				textPosition : { x : 2, y : 2 }
			})

			var optionPlay = DidJS.Game.create('rectangle', {
				id : 'menuPlay',
				position : new DidJS.Vector((width / 2) - (150 / 4) - 30, 120),
				width : 150,
				height : 20,
				filled : true,
				fillStyle : 'blue',
				text : 'Play',
				font : '15px cursive',
				textColor : 'black',
				textPosition : { x : 62, y : 15 }
			});

			var optionCredits = DidJS.Game.create('rectangle', {
				id : 'menuCredits',
				position : new DidJS.Vector((width / 2) - (150 / 4) - 30, 170),
				width : 150,
				height : 20,
				filled : true,
				fillStyle : 'blue',
				text : 'Credits',
				font : '15px cursive',
				textColor : 'black',
				textPosition : { x : 52, y : 15 }
			});

			var keyboard = DidJS.Game.createKeyboard().connectTo(selector);

			keyboard.redefineKey('left', function() {
				
			})

			keyboard.redefineKey('right', function() {
				
			})

			keyboard.redefineKey('up', function() {
				if (selector.position.Y > positionSelectorY) {
					selector.position.Y = positionSelectorY;
				}
			})

			keyboard.redefineKey('down', function() {
				if (selector.position.Y < positionSelectorY + 50) {
					selector.position.Y = positionSelectorY + 50;
				}
			})

			menuScene.add(title);
			menuScene.add(selector);
			menuScene.add(optionPlay);
			menuScene.add(optionCredits);

			return menuScene;
		}

		var scene = new DidJS.Scene('mycanvas');

		var menuScene = menu();


		var _padSpeed = 7;

		scene.setBoundariesOnX(0, width);
		scene.setBoundariesOnY(0, height);

		var padWidth = 50, padHeight = 10;

		var posPadX = (width / 2) - (padWidth / 4) - 20;
		var posPadY = height - 5;

		var brickWidth = 40;
		var brickHeight = 20;

		var pad = DidJS.Game.create('rectangle', {
			id : 'mypad',
			position : new DidJS.Vector(posPadX, posPadY),
			width : padWidth,
			height : padHeight,
			velX : 1,
			velY : 1,
			filled : true,
			fillStyle : "red"
		});

		var ball = DidJS.Game.create('circle', {
			id : 'ball',
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
				return DidJS.Game.create('rectangle', {
					id : 'brick' + x + '_' + y,
					position : new DidJS.Vector(boxx + (brickWidth * x), boxy + (brickHeight * y)),
					width : brickWidth,
					height : brickHeight,
					filled : true,
					fillStyle : value === "2" ? 'blue' : 'yellow'
				});
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

		scene.setCollisionObjects(ball, ballCollisionObjects);

		var angleX = 2, angleY = -4 /*-4*/;

		ball.when('onTick').then(function() {
			ball.position.X += 1 * angleX;
			ball.position.Y += 1 * angleY;
		})

		ball.when('onBoundaryCollision').then(function(boundaryStatus) {
			if (boundaryStatus.onXMin || boundaryStatus.onXMax) {
				angleX *= -1;
			}

			if (boundaryStatus.onYMin) {
				angleY *= -1;
			}

			if (boundaryStatus.onYMax) {
				scene.tickStopped = true;
			}
		});

		ball.when('onCollisionWith').then(function(object, where) {
			if (where === 'top' || where === 'bottom') {
				angleY *= -1;
				ball.position.Y += 1 * angleY;
			}

			if (where === 'right' || where === 'left') {
				angleX *= -1;
				ball.position.X += 1 * angleX;
			}

			if (object.id.substring(0, 5) === "brick") {
				scene.remove(object);
			}
		});

		pad.when('onBoundaryCollision').then(function(boundaryStatus) {
			if (boundaryStatus.onXMax){
				pad.position.X = width - pad.width;
				pad.speed = 0;
			}
			if (boundaryStatus.onXMin){
				pad.position.X = 0;
				pad.speed = 0;
			}
		});

		var keyboard = DidJS.Game.createKeyboard().connectTo(pad);
		var keyboardScene = DidJS.Game.createKeyboard();


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

		keyboardScene.addButton({
			name : 'pause',
			key : 80,
			strokeMethod: function(gObject) {
				console.log('pause!');
			}
		});

		scene.add(ball);
		scene.add(pad);
		_bricks.forEach(function(brick) {
			brick.forEach(function(b) {
				if (b !== null) {
					scene.add(b);
				}
			})
		})

		DidJS.Game.render(menuScene);
	}

})