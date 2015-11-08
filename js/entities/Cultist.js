function Cultist(posX, posY) {
	NPC.call(this, posX, posY);	// call super constructor
	
	this.health = 3;
	this.job = "cultist";
	this.sprite = new Sprite('img/character_cultist.png');
}

Cultist.prototype = new NPC;

Cultist.prototype.die = function() {
	//work in progress
	NPC.prototype.die();
	//console.log(scenes);
	// switch scene
	//game.scene = new CreditsScene;
	
}