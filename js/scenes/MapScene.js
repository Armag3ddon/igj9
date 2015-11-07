function MapScene( definition ) {
	this.entities = [];

	this.tileset = new Sprite(String(definition.tilesets[0].image));

	this.player = new Player(10,10);

	this.definition = definition;

	this.entities.push(this.player);
};

MapScene.prototype = new Scene;

MapScene.prototype.drawBase = MapScene.prototype.draw;

MapScene.prototype.draw = function ( ctx ) {
	var wdt = this.definition.tilewidth;
	var hgt = this.definition.tileheight;

	for (var i = 0; i < this.definition.layers.length; i++) {

		if (!this.definition.layers[i].visible) continue;

		for (var j = 0; j < this.definition.layers[i].data.length; j++) {
			var tile = this.definition.layers[i].data[j];

			if (tile == 0) continue;

			var gWdt = this.definition.tilesets[0].tilewidth;
			var gHgt = this.definition.tilesets[0].tileheight;

			var columns = this.definition.tilesets[0].imagewidth / gWdt;

			var gX = gWdt * (tile % columns) - gWdt;
			var gY = gHgt * Math.floor(tile / columns);

			var tX = gWdt * (j % this.definition.layers[i].width);
			var tY = gHgt * Math.floor(j / this.definition.layers[i].width);

			this.tileset.area(ctx, gX, gY, gWdt, gHgt, tX, tY);
		}
	}

	this.drawBase(ctx);
}

MapScene.prototype.getTilePos = function(x, y) {
	var wdt = this.definition.tilewidth;
	var hgt = this.definition.tileheight;

	return { x: x*wdt, y: y*hgt };
}

MapScene.prototype.down = function ( key ) {
	switch( key ) {
		case 'down': case 'up': case 'left': case 'right':
			this.player.startMove(key);
			break;
	}
}

MapScene.prototype.up = function ( key ) {
	switch( key ) {
		case 'down': case 'up': case 'left': case 'right':
			this.player.stopMove(key);
			break;
	}
}

MapScene.prototype.getTileSize = function() {
	return { wdt: this.definition.tileheight, hgt: this.definition.tilewidth };
}

MapScene.prototype.isWalkableTile = function(x, y) {
	return true;
}