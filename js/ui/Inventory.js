function Inventory()
{
	this.img = new Sprite( 'img/InventoryBack.png' );
	this.x = 980;
	this.y = 420;
	this.area = new Rect( new V2( this.x, this.y ), new V2( this.x+this.img.width, this.y+this.img.height ));

	this.entities = [];
}

Inventory.prototype.draw = function( ctx ) {
	this.img.draw(ctx, this.x, this.y);

	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].draw )
			this.entities[i].draw( ctx );
};