var sound = {
	urls: ['sounds/Wololo.ogg',
			'sounds/Swing.ogg',
			'sounds/Death.ogg',
			'sounds/Death2.ogg',
			'sounds/Hurt.ogg'],

	play: function( file ) {
		var self = this;

		if( !this.urls[file] )
			this.urls[file] = [];

		if( this.urls[file].length ) {
			var s = this.urls[file].pop();
			s.play();
			return s;
		} else {
			var s = new Audio( file );
			s.onended = function() { self.urls[file].push( this ); };
			s.play();
			return s;
		}
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
				this[url] = new Audio(url);
				this[url].oncanplaythrough = complete;
			}
		}

		if( total == 0 ) callback();
	}
}