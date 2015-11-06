function PlayerScene() {
	//this.bg = new Sprite('img/start_screen.jpg');

	this.entities = [ new Player(new Position(10, 10)),
					  new StaticSprite('img/button_blank.png',1280/2, 675),
					  new Button('img/button_blank.png', 'img/shop_button_big_highlight.png', 1280/2 - 374/2, 570, function() {
						  game.nextLevel();
					  }, 'sounds/menu/button_clicked.mp3'),
					  new Button('img/button_blank.png', 'img/shop_button_big_highlight.png', 1280/2 - 374/2, 641, function() {
						  game.scene = new CreditsScene;
					  }, 'sounds/menu/button_clicked.mp3'),
						new StaticSprite('img/button_start_game.png',1280/2, 604),
						new StaticSprite('img/button_credits.png',1280/2, 675)
					 ];
};

PlayerScene.prototype = new Scene;