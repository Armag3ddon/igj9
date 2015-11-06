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
		'img/TiledBack.jpg'
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