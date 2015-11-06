function Position(x, y) {
	this.setX(x);
	this.setY(y);
}

Position.prototype.setX = function(x) {
	this.x = x;
}

Position.prototype.getX = function() {
	return this.x;
}

Position.prototype.setY = function(y) {
	this.y = y;
}

Position.prototype.getY = function() {
	return this.y;
}