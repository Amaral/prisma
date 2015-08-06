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
				src:"assets/header_v.png"
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
			car.y = 390;
			car.maxMove = 540;
			stage.addChild(car);
			
			stage.update();
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener("tick", tick);
			createjs.Touch.enable(stage);

			header = new gm.HeaderV();
			logoPrisma = new gm.LogoPrisma();
			logoGM = new gm.LogoGM();
			logoGM.x = 600;
			logoPrisma.x = 55;
			logoPrisma.y = 900;
			logoGM.y = 920;
			stage.addChild(header);
			setTimeout(function(){
				stage.addChild(logoPrisma);
			},1500);
			setTimeout(function(){
				logoGM.alpha = 0;
				createjs.Tween.get(logoGM).to({alpha:1},700);
				stage.addChild(logoGM);
			},2500);
		}
		
		
		function start()
		{ 
			main();
		}
		function tick()
		{
			if(car != undefined) 
			{
				car.update(1);
				
			}
			
			stage.update();
		}
		
		window.onload = function(){start()};

})();