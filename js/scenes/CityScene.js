function CityScene() {
	this.bg = new Sprite('img/map_screen.jpg');

	this.entities = [];

	this.districtSprite = new Sprite('img/sprite_sheet_props.png');
	this.entities.push(this.districtSprite);

	for (var i = 1; i <= city.districtCount; i++) {
		this.entities.push( new District( city['district' + i], this.entities ) );
	}

	this.logButton = new LogButton;
	this.entities.push( this.logButton );

	this.entities.push( new districtInfo );
	
};

CityScene.prototype = new Scene;