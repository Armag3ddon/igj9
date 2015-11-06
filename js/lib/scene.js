function Scene() {
	this.entities = [];
}

Scene.prototype.update = function( delta ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].update )
			this.entities[i].update( delta );
};

Scene.prototype.draw = function( ctx ) {
	if( this.bg )
		this.bg.draw( ctx, 0 ,0 );

	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].draw )
			this.entities[i].draw( ctx );
};

Scene.prototype.click = function( pos ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].click )
			this.entities[i].click( pos );
};

Scene.prototype.mousedown = function( pos ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].mousedown )
			this.entities[i].mousedown( pos );
};

Scene.prototype.mouseup = function( pos ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].mouseup )
			this.entities[i].mouseup( pos );
};