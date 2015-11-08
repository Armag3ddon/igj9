function DeathAnimation(posX, offX, posY, offY) {
	this.posX = posX;
	this.posY = posY;
	this.offX = offX;
	this.offY = offY;

	this.sizeX = 72;
	this.sizeY = 144;

	this.sprite = new Sprite('img/death_animation.png');

	this.animationFrames = 8;
	this.animationDuration = 1000;
	this.animationStep = 0;

	this.bsAnimationFrames = 12;
	this.bsAnimationDuration = 2000;
	this.bsAnimationStep = 0;

	this.bloodst = false;
}

DeathAnimation.prototype.bloodstone = function() {
	console.log("hi");
	this.bloodst = true;
}

DeathAnimation.prototype.draw = function ( ctx ) {
	var tilepos = game.scene.getTilePos(this.posX, this.posY);

	var x = tilepos.x + this.offX;
	var y = tilepos.y + this.offY;

	var gX = Math.floor(this.animationStep / (this.animationDuration / this.animationFrames)) * this.sizeX;

	this.sprite.area(ctx, gX,0, this.sizeX, this.sizeY, x-36,y-100);

	if (this.bloodstoneAnim != undefined) {
		gX = Math.floor(this.bsAnimationStep / (this.bsAnimationDuration / this.bsAnimationFrames)) * this.sizeX;
		this.bloodstoneAnim.area(ctx, gX,0, this.sizeX, this.sizeY, x-36,y-100);
	}
};

DeathAnimation.prototype.update = function ( delta ) {
	if (this.animationStep == this.animationDuration-1) {
		if (this.bloodst != false) {
			this.bsAnimationStep += delta;
			if (this.bsAnimationStep > this.bsAnimationDuration)
				return game.scene = new CityScene();
		} else return;
	}

	this.animationStep += delta;
	if (this.animationStep > this.animationDuration) {
		this.animationStep = this.animationDuration-1;
		if (this.bloodst)
			this.bloodstoneAnim = new Sprite('img/bloodstone_animation.png');
	}
};