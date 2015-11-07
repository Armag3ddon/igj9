function MapScene( definition ) {
	this.tileset = new Sprite('img/HF1_A2.png');

	this.definition = definition;
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

	//experiment ->

	/*var newTileset1 = new AnimationSprite('img/character_black_yellow_blue.png', 4);
	var newTileset2 = new AnimationSprite('img/character_blonde_red_black.png', 4);
	var newTileset3 = new AnimationSprite('img/character_hat_black_beige.png', 4);
	var newTileset4 = new AnimationSprite('img/character_brown_blue_brown.png',4);

	var cX = 100;
	var cY = 100;

	var cWdtF = 144;
	var cHgtF = 288;

	var cWdt = cWdtF / 4;	//36
	var cHgt = cHgtF / 4;	//72

	var cHeadHgt = 24;
	var cChestHgt = 23;
	var cPantHgt = 20;
	var ctx2 = mapBuffer;

	newTileset1.draw(ctx2, 0, 288 / 2, 1);
	newTileset2.draw(ctx2, 0, 288 / 2 + cHeadHgt, 1);
	newTileset3.draw(ctx2, 0, 288 / 2 + cHeadHgt + cChestHgt, 1);
	//newTileset4.area(ctx2, 0, 288 / 2, cWdt, cHgt, 150, 100);

	//experiment <-*/
}