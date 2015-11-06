function PlayerScene() {
	// background
	this.bg = new Sprite('img/TiledBack.jpg');
	
	// tile data
	this.tileSizeX = 36;
	this.tileSizeY = 24;
	this.tileAmountX = 30;
	this.tileAmountY = 25;
	
	// player object
	var playerStartPosition = new V2(50, 50);
	this.player = new Player(playerStartPosition);
	
	this.entities = [ this.bg,
						this.player
					 ];
};

PlayerScene.prototype = new Scene;