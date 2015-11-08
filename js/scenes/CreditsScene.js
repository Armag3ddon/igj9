function CreditsScene() {
	this.bg = new Sprite('img/credits.jpg');

	this.entities = [ new Button('img/button_back.png', 'img/button_back_hover.png', 840, 600, function() {
						  game.scene = scenes.menu;
					  }, '')
					 ];

};

CreditsScene.prototype = new Scene;