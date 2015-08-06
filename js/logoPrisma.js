// namespace:
this.gm = this.gm||{};
(function(window) {

	LogoPrisma = function() {
		this.initialize();
	}
	
	var p = LogoPrisma.prototype = new createjs.BitmapAnimation();
	p.BitmapAnimation_initialize = p.initialize;
	
	p._spriteSheet;

	p.initialize = function() {
		var self = this;
		
		this._spriteSheet = new createjs.SpriteSheet({images: ["assets/logoprisma.png"], 
			frames: {width:210, height:75, regX: 0, regY:0},
			animations: {
            	// start, end, next, frequency
            	anim: [0,28,'false',2]
            }
        });
		this.x = 31;
		this.y = 678;
		this.BitmapAnimation_initialize(this._spriteSheet);
		this.paused = false;	
		this.gotoAndPlay('anim');
	}

	
	gm.LogoPrisma = LogoPrisma;
}(window));

