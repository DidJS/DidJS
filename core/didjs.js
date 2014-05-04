var DidJS = DidJS || {};

define(['core/Game', 
		'core/scene', 
		'core/Vector', 
		'core/AnimationManager'], function(Game, Scene, Vector, AnimationManager) {
	DidJS.Game = new Game();
	DidJS.AnimationManager = new AnimationManager();

	return DidJS;
})