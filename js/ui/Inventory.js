function Inventory()
{
	this.img = new Sprite( 'img/seeker_necklace.png' );
	this.overlay = new Sprite( 'img/seeker_necklace_overlay.png' );
	this.x = 1120;
	this.y = 560;

	this.showTime = 0;
}

Inventory.prototype.draw = function( ctx ) {
	this.img.draw(ctx, this.x, this.y);

	if (this.showTime > 0)
		this.overlay.draw(ctx, this.x, this.y);
};

Inventory.prototype.update = function( delta ) {
	if (this.showTime > 0)
		this.showTime -= delta;
};

Inventory.prototype.glow = function() {
	this.showTime=2000;
};