function Player(position, mapInfo) {
	this.position = position;
	this.mapInfo = mapInfo;
	
	this.vector = V2.RIGHT;	// simulated user input for testing
	this.sprite = new Sprite('img/Player.png');
	
	// speed in pixels / second
	this.tilesPerSecond = 2;
	this.speedX = mapInfo.tileSizeX * this.tilesPerSecond;
	this.speedY = mapInfo.tileSizeY * this.tilesPerSecond;
	
	var positionFinX = this.position.x + this.vector.x * mapInfo.tileSizeX;
	var positionFinY = this.position.y + this.vector.y * mapInfo.tileSizeY;
	this.positionFin = new V2(positionFinX, positionFinY);	// needed to check if a whole step is already done
}

Player.prototype.draw = function ( ctx ) {
	// draw char sprite
	this.sprite.draw(ctx, this.position.x, this.position.y);
}

Player.prototype.update = function ( delta ) {
	// if (control input is done) {
		if (this.vector.isEmpty()) {
			this.vector = V2.RIGHT
		}
	//}
	
	// update position
	var newPositionX = this.position.x + (this.vector.x * this.speedX * delta / 1000);
	var newPositionY = this.position.y + (this.vector.y * this.speedY * delta / 1000);
	var newPosition = new V2(newPositionX, newPositionY);
	this.updatePosition(newPosition);
}

Player.prototype.updatePosition = function(newPosition) {
	this.position = newPosition;
	
	if (true || this.position.equals(this.positionFin)) {
		console.log("position changed to: " + this.position.x + "/" + this.position.y);
	}
	
	// check if step is fully done
	if ((this.vector == V2.RIGHT && this.position.x >= this.positionFin.x && this.position.y == this.positionFin.y)
		|| (this.vector == V2.LEFT && this.position.x <= this.positionFin.x && this.position.y == this.positionFin.y)
		|| (this.vector == V2.UP && this.position.x == this.positionFin.x && this.position.y <= this.positionFin.y)
		|| (this.vector == V2.DOWN && this.position.x == this.positionFin.x && this.position.y >= this.positionFin.y)) {
		
		// update positionFin
		this.position = this.positionFin;
		
		// reset vector
		this.vector = V2.EMPTY;
	}
}

Player.prototype.position = new V2();