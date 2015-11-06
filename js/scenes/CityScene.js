function CityScene() {
	this.bg = new Sprite('img/CityBack.jpg');

	this.entities = [];

	for (var i = 1; i <= city.districtCount; i++)
		this.entities.push( new District( city['district' + i] ) );

	this.entities.push( new Inventory );
	this.entities.push( new LogButton );
};

CityScene.prototype = new Scene;