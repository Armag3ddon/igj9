function NPC(posX, posY, sprite) {
	this.posX = posX;
	this.posY = posY;
	this.finePosX = 18;
	this.finePosY = 14;
	this.job = "civilist";
	this.alive = true;
	this.health = 1;

	this.sizeX = 36;
	this.sizeY = 72;

	this.walkAnimationFrames = 4;
	this.walkAnimationDuration = 750;
	this.walkAnimationStep = 0;

	this.sprite = sprite;

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

	this.isNPC = true;
}

NPC.prototype.draw = function ( ctx ) {
	var tilepos = game.scene.getTilePos(this.posX, this.posY);

	var x = tilepos.x + this.finePosX;
	var y = tilepos.y + this.finePosY;

	var gX = Math.floor(this.walkAnimationStep / (this.walkAnimationDuration / this.walkAnimationFrames)) * this.sizeX;
	var gY = this.sizeY * 2;

	if (this.moveRight)
		gY = this.sizeY;
	if (this.moveUp)
		gY = 0;
	if (this.moveLeft)
		gY = this.sizeY * 3;

	// draw char sprite
	this.sprite.area(ctx, gX,gY, 36,72, x-18,y-65);
//	ctx.fillStyle = '#000000';
//	ctx.strokeRect(x,y, 20,20);
};

NPC.prototype.update = function ( delta ) {
	if (this.moving) {
		if (!this.path)
			return this.getPath();
		if (this.path.length == 0)
			return this.arrived();
		if (!this.isMoving()) {
			var directionX = this.path[this.nextNode].x - this.posX;
			var directionY = this.path[this.nextNode].y - this.posY;

			if (directionX < 0)
				this.moveLeft = true;
			if (directionX > 0)
				this.moveRight = true;
			if (directionY < 0)
				this.moveUp = true;
			if (directionY > 0)
				this.moveDown = true;
			return;
		}
		if (this.arrivedAtNode()) {
			if (this.moveTarget.x == this.posX && this.moveTarget.y == this.posY)
				return this.arrived();
			return this.setNextNode();
		}
		var tilesize = game.scene.getTileSize();
		var speedX = Math.floor(this.tilesPerSecond * tilesize.wdt * delta / 1000);
		var speedY = Math.floor(this.tilesPerSecond * tilesize.hgt * delta / 1000);
		var newX = this.finePosX;
		var newY = this.finePosY;

		this.calcPosition(newX, newY, speedX, speedY, tilesize, delta);
	} else {
		this.getMoveTarget();
	}
};

NPC.prototype.calcPosition = function(newX, newY, speedX, speedY, tilesize, delta) {
	if (this.moveLeft)
		newX -= speedX;
	if (this.moveRight)
		newX += speedX;
	if (this.moveUp)
		newY -= speedY;
	if (this.moveDown)
		newY += speedY;

	while (newX < 0 || newX > tilesize.wdt)
	{
		if (newX < 0)
		{
			this.posX--;
			if (this.arrivedAtNode())
				this.setNextNode();
			newX += tilesize.wdt;
		} else {
			this.posX++;
			if (this.arrivedAtNode())
				this.setNextNode();
			newX -= tilesize.wdt;
		}
	}
	while (newY < 0 || newY > tilesize.hgt)
	{
		if (newY < 0)
		{
			this.posY--;
			if (this.arrivedAtNode())
				this.setNextNode();
			newY += tilesize.hgt;
		} else {
			this.posY++;
			if (this.arrivedAtNode())
				this.setNextNode();
			newY -= tilesize.hgt;
		}
	}

	if (newX != this.finePosX || newY != this.finePosY)
	{
		this.walkAnimationStep += delta;
		if (this.walkAnimationStep > this.walkAnimationDuration)
			this.walkAnimationStep -= this.walkAnimationDuration;
	}

	this.finePosX = newX;
	this.finePosY = newY;
};

NPC.prototype.arrivedAtNode = function() {
	return this.posX == this.path[this.nextNode].x && this.posY == this.path[this.nextNode].y;
};

NPC.prototype.setNextNode = function() {
	this.nextNode++;
	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;
	if (this.nextNode >= this.path.length)
		this.arrived();
};

NPC.prototype.arrived = function() {
	this.moving = false;
};

NPC.prototype.getMoveTarget = function() {
	var tX = 0;
	var tY = 0;
	var found = false;
	for (var i = 0; i < 5; i++) {
		tX = Math.floor(Math.random() * game.scene.mapWidth);
		tY = Math.floor(Math.random() * game.scene.mapHeight);
		if (game.scene.isWalkableTile(tX, tY)) {
			found = true;
			break;
		}
	}
	if (found)
		this.setMoveTarget(tX, tY);
};

NPC.prototype.setMoveTarget = function(x, y) {
	this.moveTarget.x = x;
	this.moveTarget.y = y;

	this.path = null;

	this.moving = true;
	this.nextNode = 0;
};

NPC.prototype.getPath = function() {
	var graph = new Graph(game.scene.mapgrid);
	var start = graph.grid[this.posX][this.posY];
	var end = graph.grid[this.moveTarget.x][this.moveTarget.y];
	var result = astar.search(graph, start, end);

	this.path = result;
};

NPC.prototype.isMoving = function() {
	return this.moveDown || this.moveUp || this.moveLeft || this.moveRight;
};

NPC.prototype.attacked = function(dmg) {
	this.health -= dmg;
	if (this.health <= 0) {
		this.die();
	}
}

NPC.prototype.die = function() {
	this.alive = false;

	var death = new DeathAnimation(this.posX, this.finePosX, this.posY, this.finePosY);
	game.scene.entities.push(death);
	sound.play('sounds/Death.ogg');

	var ind = game.scene.entities.indexOf(this);
	if (ind != -1) {
		game.scene.entities.splice(ind, 1);
	}
}
