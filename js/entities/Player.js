function Player(posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.finePosX = 0;
	this.finePosY = 0;

	this.sprite = new Sprite('img/character_black_yellow_blue.png');

	// speed in pixels / second
	this.tilesPerSecond = 4;

	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;

//	this.speedX = mapInfo.tileSizeX * this.tilesPerSecond;
//	this.speedY = mapInfo.tileSizeY * this.tilesPerSecond;

//	this.positionFin = position;	// needed to check if a whole step is already done
}

Player.prototype.draw = function ( ctx ) {
	var tilepos = game.scene.getTilePos(this.posX, this.posY);

	var x = tilepos.x + this.finePosX;
	var y = tilepos.y + this.finePosY;

	// draw char sprite
	this.sprite.area(ctx, 0,0, 36,72, x,y);
};

Player.prototype.update = function ( delta ) {
	var tilesize = game.scene.getTileSize();
	var speedX = Math.floor(this.tilesPerSecond * tilesize.wdt * delta / 1000);
	var speedY = Math.floor(this.tilesPerSecond * tilesize.hgt * delta / 1000);

	var newX = this.finePosX;
	var newY = this.finePosY;

	if (this.moveLeft)
		newX -= speedX;
	if (this.moveRight)
		newX += speedX;
	if (this.moveUp)
		newY -= speedY;
	if (this.moveDown)
		newY += speedY;

	if (newX < 0 || newX > tilesize.wdt)
	{
		if (newX < 0)
		{
			if (game.scene.isWalkableTile(this.posX - 1, this.posY))
			{
				this.posX--;
				newX += tilesize.wdt;
			} else {
				newY = 0;
			}
		} else {
			if (game.scene.isWalkableTile(this.posX + 1, this.posY))
			{
				this.posX++;
				newX -= tilesize.wdt;
			} else {
				newX = tilesize.wdt;
			}
		}
	}
	if (newY < 0 || newY > tilesize.hgt)
	{
		if (newY < 0)
		{
			if (game.scene.isWalkableTile(this.posX, this.posY - 1))
			{
				this.posY--;
				newY += tilesize.hgt;
			} else {
				newY = 0;
			}
		} else {
			if (game.scene.isWalkableTile(this.posX, this.posY + 1))
			{
				this.posY++;
				newY -= tilesize.hgt;
			} else {
				newY = tilesize.hgt;
			}
		}
	}

	this.finePosX = newX;
	this.finePosY = newY;
};

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