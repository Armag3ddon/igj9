function LogButton()
{
	this.img = new Sprite( 'img/LogButton.png' );
	this.x = 980;
	this.y = 0;
	this.area = new Rect( new V2( this.x, this.y ), new V2( this.x+this.img.width, this.y+this.img.height ));

	this.opened = false;

	this.entities = [];
}

LogButton.prototype.open = function() {
	this.opened = true;
}

LogButton.prototype.close = function() {
	this.opened = false;
}

LogButton.prototype.draw = function( ctx ) {
	this.img.draw(ctx, this.x, this.y);

	if (this.opened)
	{
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(305,50, 670,620);
		for( var i = 0; i < this.entities.length; i++ )
			if( this.entities[i].draw )
				this.entities[i].draw( ctx );
	}
};

LogButton.prototype.click = function( pos ) {
	if( this.area.inside( pos )) {
		if (this.opened)
			this.close();
		else
			this.open();
	}
};