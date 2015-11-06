function Dialog(char, side, text,text2, speech, nextDialog) {
	this.text = text;
	this.text2 = text2;
	this.nextDialog = nextDialog;
	this.charSprite = new Sprite('img/character_'+char+'.png');
	this.nameSprite = new Sprite('img/character_name_'+char+'.png');

	this.arrow = new Sprite('img/arrow.png');

	if (side == 0)
		this.textBoxL = new Sprite('img/textbox_l.png');

	if (side == 1)
		this.textBoxR = new Sprite('img/textbox_r.png');

	if (typeof speech != 'undefined') {
		sound.play(speech);
	}
}

Dialog.prototype.draw = function ( ctx ) {
	if (this.textBoxL) {
		this.textBoxL.center(ctx, this.textBoxL.width/2 + 250, game.display.height - this.textBoxL.height/2 - 10);
		this.nameSprite.center(ctx, this.textBoxL.width/2 + 250 - 40, game.display.height - this.textBoxL.height/2 - 60);
		this.charSprite.center(ctx, this.charSprite.width/2 + 20, game.display.height - this.charSprite.height/2 );

		if (this.nextDialog)
			this.arrow.center(ctx, game.display.width - this.textBoxL.width + 230, game.display.height - this.textBoxL.height/2);

		ctx.fillStyle = 'white';
		ctx.font = '18px Courier New';
		ctx.fillText( this.text, game.display.width - this.textBoxL.width - 250 + 30, game.display.height - this.textBoxL.height/2 - 10);
		ctx.fillStyle = 'white';
		ctx.font = '18px Courier New';
		ctx.fillText( this.text2, game.display.width - this.textBoxL.width - 250 + 30, game.display.height - this.textBoxL.height/2 + 5);
	}
	if (this.textBoxR) {
		this.textBoxR.center(ctx, game.display.width - this.textBoxR.width/2 - 250, game.display.height - this.textBoxR.height/2 - 10);
		this.nameSprite.center(ctx, game.display.width - this.textBoxR.width/2 - 250 + 40 , game.display.height - this.textBoxR.height/2 - 60);
		this.charSprite.center(ctx, game.display.width - this.charSprite.width/2 - 20, game.display.height - this.charSprite.height/2 );

		if (this.nextDialog)
			this.arrow.center(ctx, game.display.width - this.textBoxR.width + 280, game.display.height - this.textBoxR.height/2);


		ctx.fillStyle = 'white';
		ctx.font = '18px Courier New';
		ctx.fillText( this.text, game.display.width - this.textBoxR.width - 250 + 30, game.display.height - this.textBoxR.height/2 - 10);

		ctx.fillStyle = 'white';
		ctx.font = '18px Courier New';
		ctx.fillText( this.text2, game.display.width - this.textBoxR.width - 250 + 30, game.display.height - this.textBoxR.height/2 + 5);
	}
};

Dialog.prototype.update = function ( delta ) {

};
