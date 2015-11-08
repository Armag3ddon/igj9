function Cultist(posX, posY) {
	NPC.call(this, posX, posY);	// call super constructor
	
	this.health = 3;
	this.job = "cultist";
	this.sprite = new Sprite('img/character_cultist.png');
}

Cultist.prototype = new NPC;

Cultist.prototype.die = function() {
	//NPC.prototype.die();
	console.log("a cultist died");
	this.alive = false;

	game.scene.entities.splice(0, game.scene.entities.length);
	
	// switch scene
	game.scene = new CityScene();
	
}