function Cultist(posX, posY) {
	NPC.call(this, posX, posY);	// call super constructor
	
	this.health = 3;
	this.job = "cultist";
	this.sprite = new Sprite('img/character_cultist.png');
}

Cultist.prototype = new NPC;

Cultist.prototype.attacked = function(dmg) {
	if (!this.alive) return;

	this.health -= dmg;
	if (this.health <= 0) {
		this.die();
	} else {
		sound.play('sounds/Hurt.ogg');
	}
}

Cultist.prototype.die = function() {
	var death = new DeathAnimation(this.posX, this.finePosX, this.posY, this.finePosY);
	death.bloodstone();
	game.scene.entities.push(death);
	sound.play('sounds/Death2.ogg');
	if (game.scene.player.cultistSound) {
		game.scene.player.cultistSound.pause();
		game.scene.player.cultistSound = null;
	}

	var ind = game.scene.entities.indexOf(this);
	if (ind != -1) {
		game.scene.entities.splice(ind, 1);
	}
	game.scene.cultist = null;
}