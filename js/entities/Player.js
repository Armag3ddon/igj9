function Player(position) {
	this.setPosition(position);
}

Player.prototype.draw = function ( ctx ) {
	
}

Player.prototype.update = function ( delta ) {
	// set new position
	var newPositionX = this.getPosition().getX() + this.getVector().getX();
	var newPositionY = this.getPosition().getY() + this.getVector().getY();
	this.setPosition(new Position(newPositionX, newPositionY);
}

Player.prototype.setPosition(position) {
	this.position = position;
}

Player.prototype.getPosition() {
	return this.position;
}

Player.prototype.setVector(vector) {
	this.vector = vector;
}

Player.prototype.getVector() {
	return this.vector;
}