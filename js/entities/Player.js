function Player(posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.finePosX = 0;
	this.finePosY = 0;
	this.cameraX = 36;
	this.cameraY = 72;

	this.sizeX = 72;
	this.sizeY = 144;

	this.walkAnimationFrames = 4;
	this.walkAnimationDuration = 750;
	this.walkAnimationStep = 0;

	this.sprite = new Sprite('img/main_character.png');
	
	this.dmg = 1;

	// speed in pixels / second
	//this.tilesPerSecond = 6;
	this.tilesPerSecond = 10;	// test

	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;
	this.attack = false;
}

Player.prototype.draw = function ( ctx ) {
	var tilepos = game.scene.getTilePos(this.posX, this.posY);

	var x = tilepos.x + this.finePosX;
	var y = tilepos.y + this.finePosY;

	var gX = Math.floor(this.walkAnimationStep / (this.walkAnimationDuration / this.walkAnimationFrames)) * this.sizeX;
	var gY = this.sizeY * 2;

	if (this.moveRight && !this.isMovingY())
		gY = this.sizeY;
	if (this.moveUp)
		gY = 0;
	if (this.moveLeft && !this.isMovingY())
		gY = this.sizeY * 3;
	
	if (this.attack)
		gY += this.sizeY*4;
	
	// draw char sprite
	this.sprite.area(ctx, gX,gY, this.sizeX,this.sizeY, x-36,y-130);
	//ctx.strokeRect(x-18,y-46,36,28);	// collition box
};

Player.prototype.update = function ( delta ) {
	var tilesize = game.scene.getTileSize();
	var speedX = Math.floor(this.tilesPerSecond * tilesize.wdt * delta / 1000);
	var speedY = Math.floor(this.tilesPerSecond * tilesize.hgt * delta / 1000);

	var newX = this.finePosX;
	var newY = this.finePosY;

	if (!this.attack) {	// do not walk while attacking
		if (this.moveLeft)
		{
			if (this.isMovingY())
				newX -= speedX / 1.5;
			else
				newX -= speedX;
		}
		if (this.moveRight)
		{
			if (this.isMovingY())
				newX += speedX / 1.5;
			else
				newX += speedX;
		}
		if (this.moveUp)
		{
			if (this.isMovingX())
				newY -= speedY / 1.5;
			else
				newY -= speedY;
		}
		if (this.moveDown)
		{
			if (this.isMovingX())
				newY += speedY / 1.5;
			else
				newY += speedY;
		}
	} else {
		// get attacked tile position
		var enemyTileX = this.posX;
		var enemyTileY = this.posY;

		if (this.moveRight && !this.isMovingY())
			enemyTileX++;
		else if (this.moveUp)
			enemyTileY--;
		else if (this.moveLeft && !this.isMovingY())
			enemyTileX--;
		else
			enemyTileY++;
			
		// check for enemy in attacked tile
		var npcList = game.scene.entities
		for (ind = 1; ind < npcList.length; ind++) {
			var npc = npcList[ind];
			var npcPosX = npc.posX;
			var npcPosY = npc.posY;
			
			if (npcPosX == enemyTileX && npcPosY == enemyTileY) {
				npc.attacked(this.dmg);
			}
		}
		
		this.walkAnimationStep += delta;
		if (this.walkAnimationStep > this.walkAnimationDuration)
			this.walkAnimationStep -= this.walkAnimationDuration;
	}

	if (newX != this.finePosX || newY != this.finePosY)
	{
		this.walkAnimationStep += delta;
		if (this.walkAnimationStep > this.walkAnimationDuration)
			this.walkAnimationStep -= this.walkAnimationDuration;
	}

	var movedX = newX - this.finePosX;
	var movedY = newY - this.finePosY;

	while (newX < 0 || newX > tilesize.wdt)
	{
		if (newX < 0)
		{
			if (game.scene.isWalkableTile(this.posX - 1, this.posY))
			{
				this.posX--;
				newX += tilesize.wdt;
			} else {
				newX = 0;
				movedX = 0;
			}
		} else {
			if (game.scene.isWalkableTile(this.posX + 1, this.posY))
			{
				this.posX++;
				newX -= tilesize.wdt;
			} else {
				newX = tilesize.wdt;
				movedX = 0;
			}
		}
	}
	while (newY < 0 || newY > tilesize.hgt)
	{
		if (newY < 0)
		{
			if (game.scene.isWalkableTile(this.posX, this.posY - 1))
			{
				this.posY--;
				newY += tilesize.hgt;
			} else {
				newY = 0;
				movedY = 0;
			}
		} else {
			if (game.scene.isWalkableTile(this.posX, this.posY + 1))
			{
				this.posY++;
				newY -= tilesize.hgt;
			} else {
				newY = tilesize.hgt;
				movedY = 0;
			}
		}
	}

	this.cameraX += movedX;
	this.cameraY += movedY;

	var mapMove = false;
	if (this.cameraX < -game.scene.cameraThresholdX) {
		mapMove = true;
		this.cameraX = -game.scene.cameraThresholdX;
	}
	if (this.cameraX > game.scene.cameraThresholdX) {
		mapMove = true;
		this.cameraX = game.scene.cameraThresholdX;
	}
	if (this.cameraY < -game.scene.cameraThresholdY) {
		mapMove = true;
		this.cameraY = -game.scene.cameraThresholdY;
	}
	if (this.cameraY > game.scene.cameraThresholdY) {
		mapMove = true;
		this.cameraY = game.scene.cameraThresholdY;
	}

	this.finePosX = newX;
	this.finePosY = newY;

	if (mapMove)
	{
		game.scene.calcMapOffset();
		game.scene.setFineOffset(newX, newY);
	}
};

Player.prototype.isMoving = function() {
	return this.moveDown || this.moveUp || this.moveLeft || this.moveRight;
};

Player.prototype.isMovingX = function () {
	return this.moveLeft || this.moveRight;
}

Player.prototype.isMovingY = function () {
	return this.moveUp || this.moveDown;
}

Player.prototype.startMove = function( key ) {
	switch ( key ) {
		case 'down':
			if (!this.moveDown) this.moveDown = true;
			break;
		case 'up':
			if (!this.moveUp) this.moveUp = true;
			break;
		case 'left':
			if (!this.moveLeft) this.moveLeft = true;
			break;
		case 'right':
			if (!this.moveRight) this.moveRight = true;
			break;
	}
};

Player.prototype.stopMove = function( key ) {
	switch ( key ) {
		case 'down':
			if (this.moveDown) this.moveDown = false;
			break;
		case 'up':
			if (this.moveUp) this.moveUp = false;
			break;
		case 'left':
			if (this.moveLeft) this.moveLeft = false;
			break;
		case 'right':
			if (this.moveRight) this.moveRight = false;
			break;
	}
};

Player.prototype.startAttack = function() {
	if (!this.attack) this.attack = true;
}

Player.prototype.stopAttack = function() {
	if (this.attack) this.attack = false;
}

Player.prototype.getPos = function() {
	return { x: this.posX, y: this.posY };
}

Player.prototype.getCamPos = function() {
	return { x: this.cameraX, y: this.cameraY };
}