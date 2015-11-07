function CreditsScene() {
	this.bg = new Sprite('img/game_over.jpg');

	this.entities = [ new Button('img/BackButton.png', 'img/BackButtonHL.png', 35, 35, function() {
						  game.scene = scenes.menu;
					  }, '')
					 ];

};

CreditsScene.prototype = new Scene;