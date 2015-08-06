// namespace:
this.gm = this.gm||{};
(function(window) {

	HeaderV = function() {
		this.initialize();
	}
	
	var p = HeaderV.prototype = new createjs.BitmapAnimation();
	p.BitmapAnimation_initialize = p.initialize;
	
	p._spriteSheet;

	p.initialize = function() {
		var self = this;
		//this._spriteSheet = new createjs.SpriteSheet({images: ["assets/header.png"], frequency: 10,frames: [[0,0,1024,134,0,0,0],[1024,0,1024,134,0,0,0],[0,134,1024,134,0,0,0],[1024,134,1024,134,0,0,0],[0,268,1024,134,0,0,0],[1024,268,1024,134,0,0,0],[0,402,1024,134,0,0,0],[1024,402,1024,134,0,0,0],[0,536,1024,134,0,0,0],[1024,536,1024,134,0,0,0],[0,670,1024,134,0,0,0],[1024,670,1024,134,0,0,0],[0,804,1024,135,0,0,0],[1024,804,1024,135,0,0,0],[0,939,1024,135,0,0,0],[1024,939,1024,135,0,0,0],[0,1074,1024,135,0,0,0],[1024,1074,1024,135,0,0,0],[0,1209,1024,135,0,0,0],[1024,1209,1024,135,0,0,0],[0,1344,1024,135,0,0,0],[1024,1344,1024,135,0,0,0],[0,1479,1024,135,0,0,0],[1024,1479,1024,135,0,0,0],[0,1614,1024,135,0,0,0],[1024,1614,1024,135,0,0,0],[0,1749,1024,135,0,0,0],[0,1749,1024,135,0,0,0],[1024,1749,1024,135,0,0,0],[0,1884,1024,135,0,0,0],[1024,1884,1024,135,0,0,0],[0,2019,1024,135,0,0,0],[1024,2019,1024,135,0,0,0],[0,2154,1024,135,0,0,0],[1024,2154,1024,135,0,0,0],[0,2289,1024,135,0,0,0],[0,2289,1024,135,0,0,0]]});
		this._spriteSheet = new createjs.SpriteSheet({images: ["assets/header_v.png"], 
			frames: {width:769, height:146, regX: 0, regY:0},
			animations: {
            	// start, end, next, frequency
            	anim: [0,33,'false',2]
            }
        });
		this.y = 181;
		
		this.BitmapAnimation_initialize(this._spriteSheet);
		this.paused = false;
		this.gotoAndPlay('anim')
	}

	
	gm.HeaderV = HeaderV;
}(window));

