function StaticSprite(img, x, y) {
	this.sprite = new Sprite(img);
	this.x = x;
	this.y = y;
}

StaticSprite.prototype.draw = function ( ctx ) {
		this.sprite.center(ctx, this.x ,this.y);
};

StaticSprite.prototype.update = function ( delta ) {
};