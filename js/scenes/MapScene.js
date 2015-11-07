function MapScene( definition ) {
	this.buffer = document.createElement('canvas');
	this.bufferCtx = this.buffer.getContext('2d');

	this.entities = [];

	this.tileset = new Sprite(String(definition.tilesets[0].image));

	this.player = new Player(10,15);

	this.definition = definition;

	this.entities.push(this.player);

	this.mapOffset = new V2(0,0);
	this.mapFineOffset = new V2(0,0);
	this.mapSizeX = this.definition.tilewidth * this.definition.layers[0].width;
	this.mapSizeY = this.definition.tileheight * this.definition.layers[0].height;
	this.buffer.width = this.mapSizeX;
	this.buffer.height = this.mapSizeY;

	this.cameraThresholdX = 320;
	this.cameraThresholdY = 180;

	this.calcMapOffset();

	this.renderMap();
};

MapScene.prototype = new Scene;

MapScene.prototype.drawBase = MapScene.prototype.draw;

MapScene.prototype.draw = function ( ctx ) {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0, 1280,720);

	ctx.drawImage(this.buffer, this.mapOffset.x - this.mapFineOffset.x, this.mapOffset.y - this.mapFineOffset.y);

	this.drawBase(ctx);
};

MapScene.prototype.renderMap = function() {
	var ctx = this.bufferCtx;

	var wdt = this.definition.tilewidth;
	var hgt = this.definition.tileheight;

	for (var i = 0; i < this.definition.layers.length; i++) {

		if (!this.definition.layers[i].visible) continue;

		for (var j = 0; j < this.definition.layers[i].data.length; j++) {
			var tile = this.definition.layers[i].data[j];

			if (tile == 0) continue;

			var gWdt = this.definition.tilewidth;
			var gHgt = this.definition.tileheight;

			var columns = this.definition.tilesets[0].imagewidth / gWdt;

			var gX = gWdt * (tile % columns) - gWdt;
			var gY = gHgt * Math.floor(tile / columns);

			var tX = gWdt * (j % this.definition.layers[i].width);
			var tY = gHgt * Math.floor(j / this.definition.layers[i].width);

			this.tileset.area(ctx, gX, gY, gWdt, gHgt, tX, tY);
			ctx.fillStyle = '#00ff00';
			ctx.strokeRect(tX,tY, gWdt,gHgt);
		}
	}
};

MapScene.prototype.calcMapOffset = function() {
	var wdt = this.definition.tilewidth;
	var hgt = this.definition.tileheight;
	var mapWdt = this.definition.layers[0].width * wdt;
	var mapHgt = this.definition.layers[0].height * hgt;

	var playerPos = this.player.getPos();
	var cameraOffset = this.player.getCamPos();

	var screenX = 1280/2 - playerPos.x * wdt + cameraOffset.x;
	var screenY = 720/2 - playerPos.y * hgt + cameraOffset.y;

	this.mapOffset.x = screenX;
	this.mapOffset.y = screenY;
}

MapScene.prototype.setFineOffset = function(x, y) {
	this.mapFineOffset.x = x;
	this.mapFineOffset.y = y;
}

MapScene.prototype.getTilePos = function(x, y) {
	var wdt = this.definition.tilewidth;
	var hgt = this.definition.tileheight;

	return { x: x*wdt + this.mapOffset.x - this.mapFineOffset.x, y: y*hgt + this.mapOffset.y - this.mapFineOffset.y };
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
	return { wdt: this.definition.tilewidth, hgt: this.definition.tileheight };
}

MapScene.prototype.isWalkableTile = function(x, y) {
	if (x < 0) return false;
	if (y < 0) return false;

	var pos = x + y * this.definition.layers[1].width;

	if (pos >= this.definition.layers[1].data.length) return false;

	return !this.definition.layers[1].data[pos];
}