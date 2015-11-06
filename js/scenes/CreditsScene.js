function CreditsScene() {
	this.bg = new Sprite('img/CreditsBack.jpg');

	this.entities = [ new Button('img/BackButton.png', 'img/BackButtonHL.png', 1280/2 - 125/2, 500, function() {
						  game.scene = scenes.menu;
					  }, '')
					 ];

};

CreditsScene.prototype = new Scene;