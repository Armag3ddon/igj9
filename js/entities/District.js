function District( definition ) {
	this.img = new Sprite('img/Districts/' + definition.background);
	this.posX = definition.posX;
	this.posY = definition.posY;

	this.icon = {
		X: definition.iconX,
		Y: definition.iconY,
		Wdt: definition.iconWidth,
		Hgt: definition.iconHeight
	};
}

District.prototype.draw = function ( ctx ) {
	this.img.draw(ctx, this.posX, this.posY);

	var offsetX = this.posX + this.img.width/2 - this.icon.Wdt/2;
	var offsetY = this.posY + this.img.height/2 - this.icon.Hgt/2;
	game.scene.districtSprite.area(ctx, this.icon.X, this.icon.Y, this.icon.Wdt, this.icon.Hgt, offsetX, offsetY);
}

District.prototype.update = function ( delta ) {
	//...
}