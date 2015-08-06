// namespace:
this.gm = this.gm||{};
(function(window) {

	Som = function() {
		this.initialize();
	}
	
	var p = Som.prototype = new createjs.BitmapAnimation();
	p.BitmapAnimation_initialize = p.initialize;
	
	p._spriteSheet;

	p.initialize = function() {
		var self = this;
		
		this._spriteSheet = new createjs.SpriteSheet({images: ["assets/som.png"], 
			frames: {width:79, height:70, regX: 0, regY:0},
			animations: {
            	// start, end, next, frequency
            	anim: [0,22,'anim',2]
            }
        });
		this.y = 190;
		this.x = -130;
		
		this.BitmapAnimation_initialize(this._spriteSheet);
		this.paused = false;
		this.gotoAndPlay('anim');
	}

	
	gm.Som = Som;
}(window));

