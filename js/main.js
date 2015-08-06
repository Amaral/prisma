(function(){
	
		var canvas;
		var stage;
		var car;
		var header;
		var logoPrisma;
		var logoGM;
		var som;
		var txt1;
		var queue;
		var inputRange;
		var isEnded = false;
		var timeReset = 700;
		var timeBeep = timeReset;
		var newTime = timeReset;
		var intervalBeep = 0;
		var percBeep = 0;
		var percInit = 100;
		var percMotion = 1;

		function main()
		{
			canvas = document.getElementById("easelCanvas");
			inputRange = document.getElementById("inputRange");
			queue = new createjs.LoadQueue(false);
			queue.installPlugin(createjs.Sound);
			queue.loadManifest(
			[{
				id:"car", 
				src:"assets/car.png"
			},
			{
				id:"wheel", 
				src:"assets/tire.png"
			},
			{
				id:"header", 
				src:"assets/header.png"
			},
			{
				id:"logoPrisma", 
				src:"assets/logoprisma.png"
			},
			{
				id:"logoGM", 
				src:"assets/logogm.png"
			},
			{
				id:"txt1", 
				src:"assets/txt1.png"
			},
			{
				id:"som", 
				src:"assets/som.png"
			},
			{
				id:"lanterna", 
				src:"assets/lanterna.png"
			},
			{
				id:"sombra", 
				src:"assets/sombra.png"
			},
			{
				id:"tireLight", 
				src:"assets/tirelight.png"
			},
			{
				id:"re", 
				src:"assets/re.png"
			}
			]);
			queue.addEventListener("complete", loadedAssets);
			queue.load();
		}
		
		function loadedAssets()
		{
			
			stage = new createjs.Stage(canvas);
			car = new gm.Car(new createjs.Bitmap(queue.getResult("car")),
							 new createjs.Bitmap(queue.getResult("wheel")),
							 new createjs.Bitmap(queue.getResult("wheel")),
							 new createjs.Bitmap(queue.getResult("re")),
							 new createjs.Bitmap(queue.getResult("sombra")),
							 new createjs.Bitmap(queue.getResult("tireLight")),
							 new createjs.Bitmap(queue.getResult("tireLight")));
			
			som = new gm.Som();
			txt1 = new createjs.Bitmap(queue.getResult("txt1"));
			txt1.alpha = 0;
			txt1.x = 270;
			txt1.y = 397;
			stage.addChild(txt1);
			stage.addChild(car);
			
			stage.update();
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener("tick", tick);
			createjs.Touch.enable(stage);
			
			createjs.Tween.get(txt1).wait(700).to({alpha:1},700).call(function(){car.addChild(som);});
			$('#inputRange').on('change',stagemousedown);
			
		}
		function stagemousedown(e)
		{
			window.createSoundsInit();
			percInit = inputRange.value
			$('#inputRange').off('change',stagemousedown);
		}
		function newBeep(time)
		{
			newTime = time;
			if(intervalBeep == 0)
				intervalBeep = setInterval(beep,timeBeep);
		}

		function beep()
		{
			window.createSounds(1);
			if(timeBeep != newTime)
			{
				clearInterval(intervalBeep);
				timeBeep = newTime;
				intervalBeep = setInterval(beep,timeBeep);
			}
		}
		function resetBeep()
		{
			clearInterval(intervalBeep);
			intervalBeep = 0;
			timeBeep = newTime = timeReset;
		}
		function end()
		{
			if(!isEnded)
			{
				car.animFinish();
				resetBeep();
				isEnded = true;
				header = new gm.Header();
				logoPrisma = new gm.LogoPrisma();
				logoGM = new gm.LogoGM();

				stage.addChild(header);
				setTimeout(function(){
					stage.addChild(logoPrisma);
				},2000);
				setTimeout(function(){
					logoGM.alpha = 0;
					createjs.Tween.get(logoGM).to({alpha:1},700);
					stage.addChild(logoGM);
				},3000);
				
				//$('#inputRange').remove();
			}
		}
		function start()
		{ 
			main();
		}
		function tick()
		{
			if(car != undefined && !isEnded) 
			{
				var dist = Math.sqrt(Math.pow(car.x-0,2));
				percMotion =  inputRange.value  / parseInt(percInit);
		
				if(percMotion > 1) percMotion = 1;
				if(dist < 600)
				{

					percBeep = (1-dist/600)

					newBeep(timeReset-(percBeep*600));
					
				}else 
				{
					resetBeep();
				}
				if(dist <= 50)
				{
					percMotion = 0.0015;
					if(!isEnded)
					{
						car.animFinish();
					}
				}
				if(dist <= 2)
				{
					end();
				}
				if(dist > 0.02)
				{
					car.update(percMotion);
				}
				
				
			}
			
			stage.update();
		}
		
		window.onload = function(){start()};

})();