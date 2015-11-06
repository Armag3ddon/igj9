function Player(position, sprite) {
	this.position = position;
	this.vector = new V2(0, 0);
	this.sprite = sprite;
}

Player.prototype.draw = function ( ctx ) {
	// draw char sprite
	ctx.drawImage(this.sprite, this.position.x, this.position.y);
}

Player.prototype.update = function ( delta ) {
	// update position
	var newPositionX = this.position.x + this.vector.x;
	var newPositionY = this.position.y + this.vector.y;
	this.position = new V2(newPositionX, newPositionY);
}

Player.prototype.position = new V2();