function MapScene( definition ) {
	this.tileset = new Sprite('img/HF1_A2.png');

	this.definition = definition;
};

var mapBuffer = false;

MapScene.prototype = new Scene;

MapScene.prototype.drawBase = MapScene.prototype.draw;

MapScene.prototype.draw = function ( ctx ) {
	var wdt = this.definition.tilewidth;
	var hgt = this.definition.tileheight;

	if(mapBuffer == false) {

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
		mapBuffer = ctx;

		//console.log("draw everything");
	} else {
		ctx = mapBuffer;

		//console.log("draw mapBuffer");
	}

	this.drawBase(ctx);
}