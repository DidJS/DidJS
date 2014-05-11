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

	var width = 400, height = 330;

	function gameInit() {

		var menuScene = menu(function(choice) {
			if (choice === 'play') {
				DidJS.Game.remove(menuScene);
				var playScene = play();
				DidJS.Game.render(playScene);
			}

			if (choice === 'credits') {

			}
		});


		DidJS.Game.render(menuScene);
	}

	function menu(func) {
		var menuScene = new DidJS.Scene('mycanvas');
		menuScene.id = 'menuScene';

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

		keyboard.addButton({
			name : 'select',
			key : 13,
			strokeMethod: function(gObject) {
				if (selector.position.Y = positionSelectorY) {
					menuScene.remove(selector);
					menuScene.remove(title);
					menuScene.remove(optionPlay);
					menuScene.remove(optionCredits);
					func('play');
				}
			}
		});

		menuScene.add(title);
		menuScene.add(selector);
		menuScene.add(optionPlay);
		menuScene.add(optionCredits);

		return menuScene;
	}

	function play() {

		var pauseMenu = function(func) {
			var pauseScene = new DidJS.Scene('mycanvas');
			pauseScene.id = 'pauseScene';

			var positionSelectorX = 70;
			var positionSelectorY = 170;

			var rectangleScene = DidJS.Game.create('rectangle', {
				id : 'rectangleScene',
				position : new DidJS.Vector(50, 120),
				width : 250,
				height : 150,
				filled : true,
				fillStyle : 'gray'
			});

			var selector = DidJS.Game.create('circle', {
				id : 'selector',
				position : new DidJS.Vector(positionSelectorX, positionSelectorY),
				radius : 4,
				velX : 0,
				velY : 0,
				filled : true,
				fillStyle : 'red'
			});

			var title = DidJS.Game.create('text', {
				id : 'pauseTitle',
				position : new DidJS.Vector(120, 130),
				text : 'Your choice :',
				font : '20px cursive',
				textColor : 'black',
				textPosition : { x : 2, y : 2 }
			})

			var optionResume = DidJS.Game.create('rectangle', {
				id : 'menuResume',
				position : new DidJS.Vector(positionSelectorX + 30, positionSelectorY - 10),
				width : 70,
				height : 20,
				filled : true,
				fillStyle : 'blue',
				text : 'Resume',
				font : '15px cursive',
				textColor : 'black',
				textPosition : { x : 15, y : 15 }
			});

			var optionExit = DidJS.Game.create('rectangle', {
				id : 'menuExit',
				position : new DidJS.Vector(positionSelectorX + 160, positionSelectorY - 10),
				width : 70,
				height : 20,
				filled : true,
				fillStyle : 'blue',
				text : 'Exit',
				font : '15px cursive',
				textColor : 'black',
				textPosition : { x : 15, y : 15 }
			});

			var keyboard = DidJS.Game.createKeyboard().connectTo(selector);

			keyboard.redefineKey('left', function() {
				if (selector.position.X > positionSelectorX) {
					selector.position.X = positionSelectorX;
				}
			})

			keyboard.redefineKey('right', function() {
				if (selector.position.X < positionSelectorX + 140) {
					selector.position.X = positionSelectorX + 140;
				}
			})

			keyboard.redefineKey('up', function() {
				
			})

			keyboard.redefineKey('down', function() {
				
			})

			keyboard.addButton({
				name : 'select',
				key : 13,
				strokeMethod: function(gObject) {
					console.log('a choice must be made');
					if (selector.position.X = positionSelectorX + 120) {
						pauseScene.remove(selector);
						pauseScene.remove(title);
						pauseScene.remove(optionResume);
						pauseScene.remove(optionExit);
						func('exit');
					}
				}
			});

			pauseScene.add(title);
			pauseScene.add(selector);
			pauseScene.add(optionResume);
			pauseScene.add(optionExit);

			return pauseScene;
		}

		var scene = new DidJS.Scene('mycanvas');
		scene.id = 'playScene';

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

		keyboard.addButton({
			name : 'pause',
			key : 80,
			strokeMethod: function(gObject) {
				console.log('pause!');
				if (DidJS.Game.scene) {
					scene.tickStopped = true;
					var p = pauseMenu(function(choice) {
						if (choice === 'exit') {
							DidJS.Game.remove(scene);
							gameInit();
						}
					});

					DidJS.Game.render(p);
				}
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

		return scene;
	}

})