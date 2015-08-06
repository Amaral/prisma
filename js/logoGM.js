// namespace:
this.gm = this.gm||{};
(function(window) {

	LogoGM = function() {
		this.initialize();
	}
	
	var p = LogoGM.prototype = new createjs.BitmapAnimation();
	p.BitmapAnimation_initialize = p.initialize;
	
	p._spriteSheet;

	p.initialize = function() {
		var self = this;
		
		this._spriteSheet = new createjs.SpriteSheet({images: ["assets/logogm.png"], 
			frames: {width:105, height:53, regX: 0, regY:0},
			animations: {
            	// start, end, next, frequency
            	anim: [0,64,'anim',2]
            }
        });
		this.x = 891;
		this.y = 687;
		
		this.BitmapAnimation_initialize(this._spriteSheet);
		this.paused = false;
		this.gotoAndPlay('anim');
	}

	
	gm.LogoGM = LogoGM;
}(window));

