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
	this.mapWidth = this.definition.layers[0].width;
	this.mapHeight = this.definition.layers[0].height;

	this.cameraThresholdX = 160;
	this.cameraThresholdY = 90;

	this.calcMapOffset();

	this.renderMap();

	this.initPathfinding();

	this.createNPCs();
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
};

MapScene.prototype.getTilePos = function(x, y) {
	var wdt = this.definition.tilewidth;
	var hgt = this.definition.tileheight;

	return { x: x*wdt + this.mapOffset.x - this.mapFineOffset.x, y: y*hgt + this.mapOffset.y - this.mapFineOffset.y };
};

MapScene.prototype.down = function ( key ) {
	switch( key ) {
		case 'down': case 'up': case 'left': case 'right':
			this.player.startMove(key);
			break;
		case 'x':
			this.player.attack();
			break;
	}
};

MapScene.prototype.up = function ( key ) {
	switch( key ) {
		case 'down': case 'up': case 'left': case 'right':
			this.player.stopMove(key);
			break;
	}
};

MapScene.prototype.getTileSize = function() {
	return { wdt: this.definition.tilewidth, hgt: this.definition.tileheight };
};

MapScene.prototype.isWalkableTile = function(x, y) {
	if (x < 0) return false;
	if (y < 0) return false;

	var pos = x + y * this.definition.layers[1].width;

	if (pos >= this.definition.layers[1].data.length) return false;

	return !this.definition.layers[1].data[pos];
};

MapScene.prototype.initPathfinding = function() {
	this.mapgrid = new Array(this.definition.layers[1].width);
	var rowlength = this.definition.layers[1].width;

	for (var i = 0; i < this.mapgrid.length; i++) {
		this.mapgrid[i] = new Array(rowlength);
	}

	var x = 0;
	var step = 0;
	for (var i = 0; i < this.definition.layers[1].data.length; i++)
	{
		step++;
		if (step == rowlength)
		{
			step = 0;
			x++;
		}
		this.mapgrid[x][step] = this.definition.layers[1].data[i];
	}
};

MapScene.prototype.createNPCs = function() {
	this.npcSprites = [];
	this.npcSprites.push(new Sprite('img/character_black_yellow_blue.png'));
	this.npcSprites.push(new Sprite('img/character_blonde_red_black.png'));
	this.npcSprites.push(new Sprite('img/character_brown_blue_brown.png'));
	this.npcSprites.push(new Sprite('img/character_hat_black_beige.png'));

	for (var i = 0; i < 5; i++) {
		var ind = Math.min(i, this.npcSprites.length-1);
		var npc = new NPC(10,10, this.npcSprites[ind]);
		this.entities.push(npc);
	}
	
	// create cultist
	var cultist = new Cultist(10,10);
	this.entities.push(cultist);
};

MapScene.prototype.isCharacterOnTile = function(x, y) {
	for (var i = 0; i < this.entities.length; i++) {
		if (this.entities[i].isNPC)
			if (this.entities[i].posX == x)
				if (this.entities[i].posY == y)
					return this.entities[i];
	}
	return false;
};