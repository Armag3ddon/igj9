function LogButton()
{
	this.img = new Sprite( 'img/LogButton.png' );
	this.x = 980;
	this.y = 420;
	this.area = new Rect( new V2( this.x, this.y ), new V2( this.x+this.img.width, this.y+this.img.height ));
}

LogButton.prototype.draw = function( ctx ) {
	this.img.draw(ctx, this.x, this.y);
};

LogButton.prototype.update = function( delta ) {
	
};