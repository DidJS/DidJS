var DidJS = DidJS || {};

define(['core/Game', 
		'core/world', 
		'core/Vector', 
		'core/AnimationManager'], function(Game, World, Vector, AnimationManager, Assets) {
	DidJS.Game = new Game();
	DidJS.AnimationManager = new AnimationManager();

	return DidJS;
})