function MenuScene() {
	this.bg = new Sprite('img/MenuBack.jpg');

	this.entities = [ new Button('img/StartButton.png', 'img/StartButtonHL.png', 1280/2 - 125/2, 500, function() {
						  game.scene = new CityScene;
					  }, ''),
					  new Button('img/CreditsButton.png', 'img/CreditsButtonHL.png', 1280/2 - 125/2, 600, function() {
						  game.scene = new CreditsScene;
					  }, ''),
					 ];

};

MenuScene.prototype = new Scene;