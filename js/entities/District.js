function District( definition, entities ) { 
	this.img = new Sprite('img/Districts/' + definition.background);
	this.posX = definition.posX;
	this.posY = definition.posY;

	this.entities = entities;

	this.area = new Rect( new V2( this.posX, this.posY ), new V2( this.posX+this.img.width, this.posY+this.img.height ));
	this.definition = definition;

	this.areaInfo = false;
	this.entDis = 6; //6 == districtInfo

	this.icon = {
		X: definition.iconX,
		Y: definition.iconY,
		Wdt: definition.iconWidth,
		Hgt: definition.iconHeight
	};
}

District.prototype.draw = function ( ctx ) {
	if(this.entities[this.entDis].show == false) {
		this.areaInfo = false;
	}	

	this.img.draw(ctx, this.posX, this.posY);

	var offsetX = this.posX + this.img.width/2 - this.icon.Wdt/2;
	var offsetY = this.posY + this.img.height/2 - this.icon.Hgt/2;

	if(this.area.inside(mouse)) {
		var iconArea = new Rect( new V2( offsetX , offsetY ), new V2( offsetX+this.icon.Wdt, offsetY+this.icon.Hgt ));
		
		if(iconArea.inside(mouse)){
			game.scene.districtSprite.area(ctx, this.icon.X, this.icon.Y, this.icon.Wdt, this.icon.Hgt, offsetX, offsetY);

			if(!this.areaInfo){
				ctx.beginPath();
				ctx.rect(400, 500, 400 , 60);
				ctx.fillStyle = 'white';
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = 'black';
				ctx.stroke();
			}
		} else {
			game.scene.districtSprite.area(ctx, this.icon.X, this.icon.Y, this.icon.Wdt, this.icon.Hgt, offsetX, offsetY);

			if(!this.areaInfo) {
				ctx.beginPath();
				ctx.rect(400, 300, 400 , 350);
				ctx.fillStyle = 'white';
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = 'black';
				ctx.stroke();
			}			
		}
	} else {
		game.scene.districtSprite.area(ctx, this.icon.X, this.icon.Y, this.icon.Wdt, this.icon.Hgt, offsetX, offsetY);
	}
}

District.prototype.click = function ( pos ) {
	if( this.area.inside( pos )) {
		this.areaInfo = true;
		this.entities[this.entDis].show = true;
		this.entities[this.entDis].info = "Keine Informationen zu diesem Stadtteil vorhanden.";
		this.entities[this.entDis].level = level1;
	}

}

District.prototype.update = function ( delta ) {
	//...
}