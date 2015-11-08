function Cultist(posX, posY) {
	NPC.call(this, posX, posY);	// call super constructor
	
	this.health = 3;
	this.job = "cultist";
	this.sprite = new Sprite('img/character_cultist.png');
}

Cultist.prototype = new NPC;

Cultist.prototype.die = function() {
	NPC.prototype.die();
	
	// switch scene
	//game.scene = scenes.city;
	//console.log(game);
	console.log(scenes);
}