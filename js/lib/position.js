function Position(x, y) {
	setX(x);
	setY(y);
}

Position.prototype.setX(x) {
	this.x = x;
}

Position.prototype.getX() {
	return this.x;
}

Position.prototype.setY(y) {
	this.y = y;
}

Position.prototype.getY() {
	return this.y;
}