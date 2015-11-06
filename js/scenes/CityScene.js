function CityScene() {
	this.bg = new Sprite('img/CityBack.jpg');

	this.entities = [
					new Inventory,
					new LogButton
	];
};

CityScene.prototype = new Scene;