function Player(position) {
	this.position = position;
	this.vector = new V2(0, 0);
	this.sprite = new Sprite('img/Player.png');
}

Player.prototype.draw = function ( ctx ) {
	// draw char sprite
	this.sprite.draw(ctx, this.position.x, this.position.y);
}

Player.prototype.update = function ( delta ) {
	// update position
	var newPositionX = this.position.x + this.vector.x;
	var newPositionY = this.position.y + this.vector.y;
	this.position = new V2(newPositionX, newPositionY);
}

Player.prototype.position = new V2();