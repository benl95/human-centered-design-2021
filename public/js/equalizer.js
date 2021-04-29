let canvas,
	ctx,
	source,
	context,
	analyser,
	fbc_array,
	bar_count,
	bar_pos,
	bar_width,
	bar_height;

let audio = new Audio();

audio.src = './public/videos/starwars-trailer.mp4';
audio.controls = true;
audio.loop = false;
audio.autoplay = false;

window.addEventListener(
	'load',
	() => {
		document.getElementById('audio').appendChild(audio);

		context = new AudioContext();
		analyser = context.createAnalyser();
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		source = context.createMediaElementSource(audio);

		canvas.width = window.innerWidth * 0.8;
		canvas.height = window.innerHeight * 0.6;

		source.connect(analyser);
		analyser.connect(context.destination);

		FrameLooper();

		const video = document.getElementById('player');

		video.addEventListener('play', () => {
			audio.play();
			audio.resume();
		});

		video.addEventListener('pause', () => {
			audio.pause();
		});
	},
	false
);

function FrameLooper() {
	window.RequestAnimationFrame =
		window.requestAnimationFrame(FrameLooper) ||
		window.msRequestAnimationFrame(FrameLooper) ||
		window.mozRequestAnimationFrame(FrameLooper) ||
		window.webkitRequestAnimationFrame(FrameLooper);

	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	bar_count = window.innerWidth / 2;

	analyser.getByteFrequencyData(fbc_array);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#ffffff';

	for (let i = 0; i < bar_count; i++) {
		bar_pos = i * 4;
		bar_width = 2;
		bar_height = -(fbc_array[i] / 2);

		ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
	}
}
