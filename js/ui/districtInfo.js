function districtInfo()
{
	this.show = false;
	this.level = level1;
	this.info = "Keine Informationen zu diesem Stadtteil vorhanden."

	this.x = 400;
	this.y = 300;
	this.wdt = 400;
	this.hgt = 350;

	this.a1 = new Object();
	this.a2 = new Object();

	this.a1.x = 630;
	this.a1.y = 590;
	this.a1.wdt = 150;
	this.a1.hgt = 50;

	this.a2.x = 420;
	this.a2.y = 590;
	this.a2.wdt = 150;
	this.a2.hgt = 50;

	this.area1 = new Rect( new V2( this.a1.x, this.a1.y ), new V2( this.a1.x+this.a1.wdt, this.a1.y+this.a1.hgt ));
	this.area2 = new Rect( new V2( this.a2.x, this.a2.y ), new V2( this.a2.x+this.a2.wdt, this.a2.y+this.a2.hgt ));

	this.entities = [];
}

districtInfo.prototype.draw = function( ctx ) {
	if (this.show)
	{
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.wdt , this.hgt);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.fillStyle = 'black';
		ctx.fillText(this.info, this.x + 20, this.y + 20);

		ctx.beginPath();
		ctx.rect(this.a1.x, this.a1.y, this.a1.wdt , this.a1.hgt);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.beginPath();
		ctx.rect(this.a2.x, this.a2.y, this.a2.wdt , this.a2.hgt);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}
};

districtInfo.prototype.click = function( pos ) {
	if( this.area1.inside( pos )) {
		this.show = false;
	}
	if( this.area2.inside( pos )) {
		game.scene = new MapScene(this.level);
	}
};