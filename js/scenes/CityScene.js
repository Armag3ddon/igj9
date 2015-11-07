function CityScene() {
	this.bg = new Sprite('img/CityBack.jpg');

	this.entities = [];

	this.districtSprite = new Sprite('img/sprite_sheet_props.png');
	this.entities.push(this.districtSprite);

	//this.entities.push( new districtInfo );

	for (var i = 1; i <= city.districtCount; i++)
		this.entities.push( new District( city['district' + i], this.entities ) );

	this.entities.push( new Inventory );
	this.entities.push( new LogButton );

	this.entities.push( new districtInfo );
	
};

CityScene.prototype = new Scene;