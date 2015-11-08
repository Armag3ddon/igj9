function Cultist(posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.finePosX = 18;
	this.finePosY = 14;

	this.sizeX = 36;
	this.sizeY = 72;

	this.walkAnimationFrames = 4;
	this.walkAnimationDuration = 750;
	this.walkAnimationStep = 0;

	this.sprite = new Sprite('img/character_cultist.png');

	// speed in pixels / second
	this.tilesPerSecond = 2;

	this.moveTarget = new V2(0,0);
	this.moving = false;
	this.path = null;
	this.nextNode = 0;

	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;
}

Cultist.prototype = new NPC;