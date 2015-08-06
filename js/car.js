// namespace:
this.gm = this.gm||{};
(function()
{
	var Car = function(bitmapCarcass,bitmapWheelLeft,bitmapWheelRight,bitmapLight,bitmapShadow,bitmapLightRight,bitmapLightLeft) {	
	  this.initialize(bitmapCarcass,bitmapWheelLeft,bitmapWheelRight,bitmapLight,bitmapShadow,bitmapLightRight,bitmapLightLeft);
	}
	/* 
		herança / base class / super class
		var p = Class.prototype = new namespace.Class();
	*/
	var p = Car.prototype = new createjs.Container();

	// method super
	p.Container_initialize = p.initialize;

	// imagem da carcaça do carro
	p.carcass;
	p.containerCarcass;

	// imagem pneu direta
	p.wheelRight;

	// imagem pneu esquerda
	p.wheelLeft;
	//
	
	// imagem lanterna
	p.light;
	//
	p.shadow;
	//
	p.tireLightRight;
	p.tireLightLelf;
	//
	p.freio = true;
	//
	p.minMove = 0;
	p.maxMove = 683;
	// constructor
	p.initialize = function(bitmapCarcass,bitmapWheelLeft,bitmapWheelRight,bitmapLight,bitmapShadow,bitmapLightRight,bitmapLightLeft) {
		p.Container_initialize();
		this.carcass = bitmapCarcass;
		this.wheelLeft = bitmapWheelLeft;
		this.wheelRight = bitmapWheelRight;
		this.light = bitmapLight;
		this.shadow = bitmapShadow;
		this.tireLightLelf = bitmapLightLeft;
		this.tireLightRight = bitmapLightRight;
		// posicionando as rodas
		this.wheelLeft.regX = this.tireLightLelf.regX = 62;
		this.wheelLeft.regY = this.tireLightLelf.regY = 62;
		this.wheelRight.regX = this.tireLightRight.regX = 62;
		this.wheelRight.regY = this.tireLightRight.regY = 62;
		this.wheelLeft.x = this.tireLightLelf.x = 152;
		this.wheelRight.x = this.tireLightRight.x = 630;
		this.wheelLeft.y = this.wheelRight.y = this.tireLightRight.y = this.tireLightLelf.y = 263;

		this.containerCarcass = new createjs.Container();
		this.addChild(this.shadow);
		this.addChild(this.containerCarcass);
		this.containerCarcass.addChild(this.carcass);
		this.addChild(this.wheelLeft);
		this.addChild(this.wheelRight);
		this.addChild(this.tireLightLelf);
		this.addChild(this.tireLightRight);
		
		this.shadow.y = 272;
		this.shadow.x = -57;
		this.light.y = 149;
		this.light.x = 8;
		this.light.alpha = 0.96;
		this.y = 241;
		this.x = 1083;
		this.containerCarcass.regX = this.containerCarcass.x = 630;
		this.containerCarcass.regY = this.containerCarcass.y = 157;
		this.wheelLeft.rotation = 1200;
		this.wheelRight.rotation = 1200;
	}
	p.lightOn = function()
	{
		this.containerCarcass.addChild(this.light);
	}
	p.lightOff = function()
	{
		this.containerCarcass.removeChild(this.light);
	}
	p.animFinish = function()
	{
		createjs.Tween.get(this.containerCarcass).to({y:160,rotation:0.4},800,createjs.Ease.quadIn).to({rotation:0,y:157},400,createjs.Ease.quadInOut).to({y:157,rotation:0},600,createjs.Ease.quadOut);
	}
	p.update = function(perc)
	{
		var re = false;
		var min = this.minMove;
		var max = this.maxMove;
		var ease = 25;
		var current = min + (max-min) * perc;
		if(current < this.x)
		{
			re = true;
		}
		this.x += ((current) - this.x)/ease;

		max = 800;
		min = 0;
		var distLight = Math.sqrt(Math.pow(current -this.x,2))/15;
		current = min + (max-min) * perc;
		
		this.wheelLeft.rotation += (current-this.wheelLeft.rotation)/ease;
		this.wheelRight.rotation += (current-this.wheelRight.rotation)/ease;
		// codigo freio
		// if(Math.abs(distLight) < 7 && Math.abs(distLight) > 0.2 && !this.freio)
		// {
		// 	this.lightOn();
		// }
		// else if(Math.abs(distLight) > 7) 
		// {
		// 	this.freio = false;
		// 	this.lightOff();
		// }
		// else if(Math.abs(distLight) < 0.2)
		// {
		// 	this.lightOff();
		// 	this.freio = true;
		// }
		if(re && Math.abs(distLight) > 0.2)
		{
			this.lightOn();
		}else
		{
			this.lightOff();
		}

	}

	gm.Car = Car;
	
}());