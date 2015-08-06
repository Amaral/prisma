(function(scope,$){

	var myAudioContext = new AudioContext();
	var buffer1;
	var buffer2;
	var music1;
	var music2;
	var source = myAudioContext.createBufferSource();
	source.loop = false;

	var loadSound = function(path,callback)
	{
		var completeSound = $.Deferred();
		var request = new XMLHttpRequest();
		request.open('GET', path, true);
		request.responseType = 'arraybuffer';
		request.addEventListener('load', function(event){
			myAudioContext.decodeAudioData(request.response, function(buffer){
				buffer1 = buffer
	         	completeSound.resolve(buffer);
	        });


		}, false);
		request.send();
		return completeSound.promise();
	}
	var createSource = function(audioBuffer) {
		var source = myAudioContext.createBufferSource();
		var gainNode = myAudioContext.createGain();
	    source.buffer = audioBuffer;
	    source.connect(myAudioContext.destination); 
	    source.connect(gainNode);
	   return {source : source, gainNode:gainNode }
		
	}

	var playSound = function(music)
	{
		music.source.start(0);
	}
	var stopSound = function(music)
	{
		if(music1) music.source.stop(0);
	}
	var changeVolume = function(source,volume)
	{
		source.gainNode.gain.value = volume;
	}
	
	var createSounds = function()
	{
		stopSound(music1);
		music1 = createSource(buffer1);
		changeVolume(music1,1);
	 	playSound(music1);
	}
	var createSoundsInit = function()
	{
		stopSound(music1);
		music1 = createSource(buffer1);
		changeVolume(music1,0.001);
		playSound(music1);
	}		
	var init = function()
	{
		var musicPromise1 = loadSound('assets/beep-8.wav');
		
		$.when(musicPromise1).done(function(music1Response)
		{
			buffer1 = music1Response;
		});
		
	}
	window.createSounds = createSounds;
	window.createSoundsInit = createSoundsInit;
	$(document).ready(init);

})(window,jQuery);