function MenuScene() {
	this.bg = new Sprite('img/main_screen.jpg');

	this.entities = [ new Button('img/button_credits.png', 'img/button_credits_hover.png', 1280/2 - 125/2, 400, function() {
						  game.scene = new PlayerScene;
					  }, ''),
					  new Button('img/button_start.png', 'img/button_start_hover.png', 1280/2 - 125/2, 500, function() {
						  game.scene = new CityScene;
					  }, ''),
					  new Button('img/button_credits.png', 'img/button_credits_hover.png', 1280/2 - 125/2, 600, function() {
						  game.scene = new CreditsScene;
					  }, ''),
					 ];

};

MenuScene.prototype = new Scene;