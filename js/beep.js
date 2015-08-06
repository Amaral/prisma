(function(scope,$){

	var myAudioContext = new webkitAudioContext();
	var buffers = [];
	var beeps = [];
	var buffer1, buffer2, buffer3, buffer4, buffer5;
	var music1;
	var music2;
	var intervalBeep = 0;

	var loadSound = function(path,callback)
	{
		var completeSound = $.Deferred();
		var request = new XMLHttpRequest();
		request.open('GET', path, true);
		request.responseType = 'arraybuffer';
		request.addEventListener('load', function(event){
			completeSound.resolve(event.target);
		}, false);
		request.send();
		return completeSound.promise();
	}
	var createSource = function(request) {
		var source = myAudioContext.createBufferSource();
		// Create a gain node.
		var gainNode = myAudioContext.createGainNode();
		var delayNode = myAudioContext.createDelay();
		
		source.buffer = myAudioContext.createBuffer(request.response, false);

		// Turn on looping.
		source.loop = false;
		// Connect source to gain.
		

		// Connect gain to destination.
		
		source.connect(delayNode);
		source.connect(gainNode);
		gainNode.connect(myAudioContext.destination);

		return {
			source: source,
			gainNode: gainNode,
			delayNode: delayNode
		};
	}

	var playSound = function(music)
	{
		music.source.noteOn(0);
	}
	var stopSound = function(music)
	{
		if(music) music.source.noteOff(0);
	}
	var changeVolume = function(source,volume,delay)
	{

		source.gainNode.gain.value = volume;
		
	}
	
	var createSounds = function()
	{
		var beep;
		for (var i = 0; i < buffers.length; i++) {
			stopSound(beeps[i]);
			beep = createSource(buffers[i]);
			beep.delayNode.delayTime.value = 0.5;
			beeps.push(beep)
			changeVolume(beep,1);
			playSound(beep,1000*i);
		};
	}
	var init = function()
	{
		var musicPromise1 = loadSound('assets/beep-8.wav');
		var musicPromise2 = loadSound('assets/beep-8.wav');
		var musicPromise3 = loadSound('assets/beep-8.wav');
		var musicPromise4 = loadSound('assets/beep-8.wav');
		var musicPromise5 = loadSound('assets/beep-8.wav');
		
		$.when(musicPromise1,
			   musicPromise2,
			   musicPromise3,
			   musicPromise4,
			   musicPromise5).done(function(
										   music1Response, 
										   music2Response,
										   music3Response,
										   music4Response,
										   music5Response)
		{
			buffers.push(music1Response,music2Response,music3Response,music4Response,music5Response);
			createSounds();

		});

	}
	var playBeep = function(perc,volume)
	{
		
		stopSound(beeps[0]);
		playSound(beeps[0]);
	
		// var id = Math.round(perc/2*10);
		// var beep;
		// for (var i = 0; i < beeps.length; i++) {
		// 	beep = beeps[i];
		// 	changeVolume(beep,volume);
		// };
	}
	window.playBeep = playBeep;
	
	$(document).ready(init);

})(window,jQuery);