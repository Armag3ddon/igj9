var g = {
	urls: [
		'img/MenuBack.jpg',
		'img/CityBack.jpg',
		'img/CreditsBack.jpg',
		'img/StartButton.png',
		'img/StartButtonHL.png',
		'img/CreditsButton.png',
		'img/CreditsButtonHL.png',
		'img/BackButton.png',
		'img/BackButtonHL.png',
		'img/LogButton.png',
		'img/InventoryBack.png',
		'img/Player.png',
		'img/TiledBack.jpg',
		'img/Districts/District1.png',
		'img/Districts/District2.png',
		'img/Districts/District3.png',
		'img/Districts/District4.png',
		'img/sprite_sheet_props.png',
		'img/HF1_A2.png'
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