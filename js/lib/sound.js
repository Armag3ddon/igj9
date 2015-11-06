var sound = {
	sampels: ['sounds/menu/button_clicked.mp3'],

	play: function( file ) {
		var self = this;

		if( !this.sampels[file] )
			this.sampels[file] = [];

		if( this.sampels[file].length ) {
			var s = this.sampels[file].pop();
			s.play();
			return s;
		} else {
			var s = new Audio( file );
			s.onended = function() { self.sampels[file].push( this ); };
			s.play();
			return s;
		}
	}
}