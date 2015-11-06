function Animation(img, frameCount, x, y, lifeTime, callback) {
	this.animation = new AnimationSprite(img, frameCount);
	this.animationDuration = lifeTime;
	this.animationTime = 0;
	this.animationFrameCount = frameCount;
	this.x = x;
	this.y = y;
	if (typeof callback == 'function') {
		this.callback = callback;
	}
}

Animation.prototype.draw = function ( ctx ) {
		this.animation.center(ctx, this.x ,this.y , (((this.animationTime/this.animationDuration)*this.animationFrameCount)|0));
};

Animation.prototype.update = function ( delta ) {
	this.animationTime += delta;

	if (this.animationTime >= this.animationDuration) {
		arrayRemove( game.scene.entities, this);
		if (typeof this.callback == 'function') this.callback();
	}
};

function ScreenShake(duration) {
	this.d = duration;
	this.c = 0;
}

ScreenShake.prototype.update = function(delta) {
	this.c += delta;
	if( this.c < this.d ) {
		game.animation.x = Math.round(Math.random() * 8) - 4;
		game.animation.y = Math.round(Math.random() * 8) - 4;
	} else {
		game.animation.x = 0;
		game.animation.y = 0;
		arrayRemove(game.scene.entities, this);
	}
};

function ScreenFlash(duration, callback) {
	this.d = duration;
	this.c = 0;
	this.callback = callback;
}

ScreenFlash.prototype.update = function(delta) {
	this.c += delta;
	if( this.c < this.d ) {
		game.animation.alpha = this.c / this.d;
	} else {
		game.animation.alpha = 1;
		arrayRemove(game.scene.entities, this);
		if( this.callback ) this.callback();
	}
};