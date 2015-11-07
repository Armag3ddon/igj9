function PlayerScene() {
	// background
	this.bg = new Sprite('img/TiledBack.jpg');
	
	// tile data
	this.tileSizeX = 36;
	this.tileSizeY = 28;
	this.tileAmountX = 30;
	this.tileAmountY = 25;
	
	// player object
	//var playerStartPosition = new V2(parseInt(this.tileAmountX / 2) * this.tileSizeX, parseInt(this.tileAmountY / 2) * this.tileSizeY);	// centered
	var playerStartPosition = new V2(0 * this.tileSizeX, 0 * this.tileSizeY);
	var mapInfo = {
		tileSizeX: this.tileSizeX,
		tileSizeY: this.tileSizeY,
		tileAmountX: this.tileAmountX,
		tileAmountY: this.tileAmountY
	}
	this.player = new Player(playerStartPosition, mapInfo);
	
	this.entities = [ this.bg,
						this.player
					 ];
};

PlayerScene.prototype = new Scene;