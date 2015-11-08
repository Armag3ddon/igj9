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

	var offsetX = this.posX + this.img.width/2 - this.icon.Wdt/2;
	var offsetY = this.posY + this.img.height/2 - this.icon.Hgt/2;

	if(this.area.inside(mouse)) {
		var iconArea = new Rect( new V2( offsetX , offsetY ), new V2( offsetX+this.icon.Wdt, offsetY+this.icon.Hgt ));
		this.img.draw(ctx, this.posX, this.posY);
	}
}

District.prototype.click = function ( pos ) {
	if( this.area.inside( pos )) {
		this.areaInfo = true;
		//this.entities[this.entDis].show = true;
		//this.entities[this.entDis].level = level1;//this.definition.map;
	
		switch(this.definition.background) {
			case 'District1.png':
				game.scene = new MapScene(level1);
				break;
			case 'District2.png':
				game.scene = new MapScene(level2);
				break;
			case 'District3.png':
				game.scene = new MapScene(level3);
				break;
			case 'District4.png':
				game.scene = new MapScene(level4);
				break;
			case 'District5.png':
				game.scene = new MapScene(level5);
				break;
			default:				
				break;
		}
	}
}

District.prototype.update = function ( delta ) {
	//...
}