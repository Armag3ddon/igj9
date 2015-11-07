function Player(position, mapInfo) {
	this.position = position;
	this.mapInfo = mapInfo;
	
	this.updateVector(V2.EMPTY);	// simulated user input for testing
	this.sprite = new Sprite('img/character_black_yellow_blue.png');
	
	// speed in pixels / second
	this.tilesPerSecond = 2;
	this.speedX = mapInfo.tileSizeX * this.tilesPerSecond;
	this.speedY = mapInfo.tileSizeY * this.tilesPerSecond;
	
	this.positionFin = position;	// needed to check if a whole step is already done
}

Player.prototype.draw = function ( ctx ) {
	// draw char sprite
	this.sprite.draw(ctx, this.position.x, this.position.y);
}

Player.prototype.update = function ( delta ) {
	if (false && controls.down(68)) {
		console.log("right");
		if (this.vector.isEmpty()) {
			// set vector depending on user input
			this.updateVector(V2.RIGHT);
		}
	}
	
	// update position
	var newPositionX = this.position.x + (this.vector.x * this.speedX * delta / 1000);
	var newPositionY = this.position.y + (this.vector.y * this.speedY * delta / 1000);
	var newPosition = new V2(newPositionX, newPositionY);
	this.updatePosition(newPosition);
}

Player.prototype.updatePosition = function(newPosition) {
	this.position = newPosition;
	
	if (this.position.equals(this.positionFin)) {
//		console.log("position changed to: " + this.position.x + "/" + this.position.y);
	}
	
	// check if step is fully done
	if ((this.vector == V2.RIGHT && this.position.x >= this.positionFin.x && this.position.y == this.positionFin.y)
		|| (this.vector == V2.LEFT && this.position.x <= this.positionFin.x && this.position.y == this.positionFin.y)
		|| (this.vector == V2.UP && this.position.x == this.positionFin.x && this.position.y <= this.positionFin.y)
		|| (this.vector == V2.DOWN && this.position.x == this.positionFin.x && this.position.y >= this.positionFin.y)) {
		
		// set position for preventing errors by rounding deviation
		this.position = this.positionFin;
		
		// reset vector
		this.updateVector(V2.EMPTY);
	}
}

Player.prototype.updateVector = function(vector) {
	// set vector
	this.vector = vector;
	
	// set finish position of step
	var positionFinX = this.position.x + this.vector.x * this.mapInfo.tileSizeX;
	var positionFinY = this.position.y + this.vector.y * this.mapInfo.tileSizeY;
	this.positionFin = new V2(positionFinX, positionFinY);
}

Player.prototype.position = new V2();