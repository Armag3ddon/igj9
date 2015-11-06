function PlayerScene() {
	this.bg = new Sprite('img/MenuBack.jpg');
	this.playerSprite = new Sprite('img/Player.png');

	this.entities = [ new Player(new V2(0, 0), this.playerSprite)
					 ];
};

PlayerScene.prototype = new Scene;