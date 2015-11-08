function LogButton()
{
	this.x = 980;
	this.y = 0;
	this.sprite = new Sprite('img/log_screen.jpg');
	var anchorStart = new V2( this.x, this.y );
	var anchorEnd = new V2( this.x + 300, this.y + 300 );
	this.area = new Rect( anchorStart, anchorEnd );
	
	// popup
	var popupP1 = new V2(305, 50);
	var popupP2 = new V2(popupP1.x + 670, popupP1.y + 620);
	this.popup = new Rect(popupP1, popupP2);

	this.opened = false;
	
	this.amountOfLines = 0;

	this.entities = [ new LogEntry(this, "Tag 1: Das Wettrennen beginnt, dieser Wahnsinn muss gestoppt werden!"),
					new LogEntry(this, "Tag 2: Ich konnte die Notiz entschlüsseln, die du dem Kultisten abgenommen hast. Anscheinend versuchen diese Kultisten mit ihren Ritualen ein Portal zur Unterwelt in der Stadt zu öffnen. Das müssen wir verhindern!"),
					new LogEntry(this, "Tag 3: 	Danke, für die zweite Notiz. Leider konnte ich nur eines der Merkmale für den Bezirk entschlüsseln, in dem das Portal auftauchen wird. Bringe mir unbedingt weitere Hinweise, damit ich den Ort herausfinden kann."),
					new LogEntry(this, "Tag 4:	Wir kommen der Wahrheit näher! Ich fürchte, wir brauchen aber noch weitere Hinweise für den genauen Ort. Wir müssen das Portal mit den Blutsteinen der Kultisten versiegeln, bevor die Bedrohung überhaupt entsteht."),
					new LogEntry(this, "Tag 5:	Hmm... ich das reicht leider noch nicht um genau herauszufinden, wo dieses Pack das Portal öffnen will. Wenn es irgendwie geht, bringe mir so schnell wie möglich weitere Notizen."),
					new LogEntry(this, "Tag 6:	Ich konnte es jetzt schon auf zwei Bezirk eingrenzen. Leider haben wir nicht die Zeit, für eine gründliche Suche. Treibe noch eine weitere Notiz auf, dann müssten wir den Ort des Portals haben!"),
					new LogEntry(this, "Tag 7: 	Wunderbar, wir haben es! Wir müssen das Portal unbedingt versiegeln!")];
	
	var lastEntryId = game.winCounter+1;
	lastEntryId = 6+1;	// test
	this.entities.splice(lastEntryId, this.entities.length);
	
	if (this.entities.length == 7) {
		this.winButton;
	}
	
}

LogButton.prototype.open = function() {
	this.opened = true;
}

LogButton.prototype.close = function() {
	this.opened = false;
}

LogButton.prototype.draw = function( ctx ) {
	if (this.opened)
	{
		ctx.fillStyle = '#ffffff';
		var width = this.popup.p2.x - this.popup.p1.x;
		var height = this.popup.p2.y - this.popup.p1.y;
		ctx.fillRect(this.popup.p1.x, this.popup.p1.y, width, height);
		for( var i = 0; i < this.entities.length; i++ )
			if( this.entities[i].draw )
				this.entities[i].draw( ctx );
	}
};

LogButton.prototype.click = function( pos ) {
	if( this.area.inside( pos )) {
		if (this.opened)
			this.close();
		else
			this.open();
	}
};

LogButton.prototype.addLog = function(log) {
	if (typeof log == 'LogEntry') {
		this.entities.push(log);
	}
}

function LogEntry(logButton, text) {
	this.logButton = logButton;
	this.maxLength = 54;
	this.margin = 10;
	var lines = [];
	var ind = 0;
	for (var i = 0, charsLength = text.length; i < charsLength; i += this.maxLength) {
		lines[ind] = {};
		lines[ind].text = text.substring(i, i + this.maxLength);
	
		var positionX = this.logButton.popup.p1.x + this.margin;
		var yAdd = this.logButton.amountOfLines*config.fontsize;
		var positionY = this.logButton.popup.p1.y + yAdd;
		var position = new V2(positionX, positionY);
		lines[ind].position = position;
		ind++;
		this.logButton.amountOfLines++;
	}
	this.lines = lines;
	if (false && this.lines.length) {
		this.logButton.amountOfLines += this.lines.length;
	}
}

LogEntry.prototype.draw = function( ctx ) {
	ctx.fillStyle = config.fontcolor;
	ctx.font = config.font;
	for (ind = 0; ind < this.lines.length; ind++) {
		var line = this.lines[ind];
		ctx.fillText( line.text, line.position.x, line.position.y + config.fontsize + this.margin);
	}
}