require(['core/didjs'], function(DidJS) {
	
	var registeredPath = DidJS.Game.register('Resources/Mario/').asPathFor('Images')
				.load([
					{ name : 'luigi',  file : 'luigi.gif' }, 
					{ name : 'mario', file : 'mario_complete.gif' }
					], gameInit);

	registeredPath.onerror = function(error) {
		alert(error);
	};
	
	function gameInit() {
		DidJS.Game.world = new DidJS.World('mycanvas');

		DidJS.Game.world.setBoundariesOnX(0, 800);
		DidJS.Game.world.setBoundariesOnY(0, 600);


		var player = DidJS.Game.createGameObject('mario', 'rectangle').withProperties({
			position : new DidJS.Vector(400, 100),
			width : 21,
			height : 27,
			velX : 3,
			velY : 3
		});

		player.direction = 0;

		var luigi = DidJS.Game.createGameObject('luigi', 'rectangle').withProperties( {
			position : new DidJS.Vector(400, 400),
			width : 36,
			height : 37,
			velX : 3,
			velY : 3
		})

		luigi.direction = -1;

		var keyboard = DidJS.Game.createKeyboard().connectTo(player);

		keyboard.onKeyDown = function(keyProperties) {
			var self = this;
			if (keyProperties.name === 'left') { 
				DidJS.Game.setAnimation("walkleft", true).to(self.parent);
			}
			else if (keyProperties.name === 'right') {
				DidJS.Game.setAnimation("walkright", true).to(self.parent);
			}
			
			
		}

		keyboard.onKeyUp = function(keyProperties) {
			var self = this;
			if (keyProperties.name === 'left') { 
				DidJS.Game.setAnimation("walkleft", false).to(self.parent);
			}
			else if (keyProperties.name === 'right') {
				DidJS.Game.setAnimation("walkright", false).to(self.parent);
			}
		}

		var animationIdlePlayer = {key : "idle", frameStart : 7, frameEnd : 7, fps: 1 };
		var animationWalkLeft = { key : "walkleft", frameStart : 0, frameEnd : 2, fps : 7 };
		var animationWalkRight = {key : "walkright", frameStart : 3, frameEnd : 5, fps : 7 };
		var animationJump = { key : "jump", frameStart : 8, frameEnd : 8, fps : 1 };
		var animationDown = { key : "down", frameStart : 6, frameEnd : 6, fps : 1 };

		var animationIdleLuigi = {key : "idle", frameStart : 0, frameEnd : 2, fps : 3 };

	
		DidJS.Game.initializeAnimations(
			[
				animationIdlePlayer, 
				animationWalkLeft,
				animationWalkRight,
				animationJump,
				animationDown
			])
		.to(player);

		DidJS.Game.initializeAnimations([animationIdleLuigi]).to(luigi);

		DidJS.Game.world.setCollisionObjects(player, [luigi]);

		player.onCollisionWith = function(object, where) {
			this.position.X = 700;
		}

		luigi.onTick = function() {
			this.position.X  += 1 * this.direction;
		}

		luigi.onBoundaryCollision = function(boundaryStatus) {
			this.direction *= -1;
		}


		keyboard.bindKey("left").to(animationWalkLeft);
		keyboard.bindKey("right").to(animationWalkRight);
		keyboard.bindKey("up").to(animationJump);
		keyboard.bindKey("down").to(animationDown);

		DidJS.Game.setAnimation("walkright", false).to(player);
		DidJS.Game.setAnimation("idle", true).to(luigi);

		DidJS.Game.world.add(player);
		DidJS.Game.world.add(luigi);


		DidJS.Game.world.render();
	}
})