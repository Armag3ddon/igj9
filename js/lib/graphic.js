var g = {
	urls: [
		'img/CreditsBack.jpg',
		'img/BackButton.png',
		'img/BackButtonHL.png',
		'img/credits.jpg',
		'img/button_start.png',
		'img/button_start_hover.png',
		'img/button_credits.png',
		'img/button_credits_hover.png',
		'img/button_back.png',
		'img/button_back_hover.png',
		'img/TiledBack.jpg',
		'img/Districts/district1.png',
		'img/Districts/district2.png',
		'img/Districts/district3.png',
		'img/Districts/district4.png',
		'img/Districts/district5.png',
		'img/sprite_sheet_props.png',
		'img/sprite_sheet_props_main.png',
		'img/character_black_yellow_blue.png',
		'img/character_blonde_red_black.png',
		'img/character_brown_blue_brown.png',
		'img/character_hat_black_beige.png',
		'img/game_over.jpg',
		'img/main_screen.jpg',
		'img/map_screen.jpg',
		'img/character_cultist.png',
		'img/main_character.png'

	],

	add: function( url ) {
		this.urls.push( url );
	},

	load: function( callback ) {
		var total = 0, loaded = 0;

		function complete() {
			if( ++loaded >= total ) callback();
		}

		while( this.urls.length ) {
			var url = this.urls.shift();
			if( typeof this[url] == 'undefined' ) {
				total++;
				this[url] = new Image();
				this[url].onload = complete;
				this[url].src = url;
			}
		}

		if( total == 0 ) callback();
	}
}