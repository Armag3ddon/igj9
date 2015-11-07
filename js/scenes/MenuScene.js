function MenuScene() {
	this.bg = new Sprite('img/main_screen.jpg');

	this.entities = [ new Button('img/button_credits.png', 'img/button_credits_hover.png', Math.round(1280/1.4 - 125/2), 400, function() {
						  game.scene = new MapScene(level1);
					  }, ''),
					  new Button('img/button_start.png', 'img/button_start_hover.png', Math.round(1280/1.4 - 125/2), 500, function() {
						  game.scene = new CityScene;
					  }, ''),
					  new Button('img/button_credits.png', 'img/button_credits_hover.png', Math.round(1280/1.4 - 125/2), 600, function() {
						  game.scene = new CreditsScene;
					  }, ''),
					 ];

};

MenuScene.prototype = new Scene;