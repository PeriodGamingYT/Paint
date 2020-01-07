var picture = [];
var size = {
	x : 0,
	y : 0
}
var mouse = {
	x : 50,
	y : 50,
	scroll : {
		x : 0,
		y : 0
	}
}
var hue = "#FF0000";
var mouseDown = false;

// Create the Picture.
function start() {
	var s = prompt("Please put in size (Width x Height).");	
	var d = s.split(" x ");
	size.y = d[1];
	size.x = d[0];
	for(var i = 0; i < d[0] * d[1]; i++) {
		picture.push("#FFFFFF");
	}
	mouse.scroll.x = 0;
	mouse.scroll.y = 0;
	var canvas = document.getElementById("canvas");
	canvas.style.cursor = "none";
	canvas.style.height = window.innerHeight + "px";
	canvas.style.width = window.innerWidth + "px";
	canvas.style.position = "absolute";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.requestPointerLock = canvas.requestPointerLock ||
			     canvas.mozRequestPointerLock ||
			     canvas.webkitRequestPointerLock;
	// Ask the browser to lock the pointer
	canvas.requestPointerLock();
}

start();

document.getElementById("canvas").onmouseup = function() {
	mouseDown = false;
}

document.getElementById("canvas").onmousemove = function() {
	mouse.x += Math.round(event.movementX * 0.1);
	mouse.y += Math.round(event.movementY * 0.1);
	if(mouse.x > window.innerWidth) {
		mouse.x = 5;
	}
	if(mouse.x < 0) {
		mouse.x = window.innerWidth-5;
	}
	if(mouse.y > window.innerHeight) {
		mouse.y = 5;
	}
	if(mouse.y < 0) {
		mouse.y = window.innerHeight-5;
	}
}

document.getElementById("canvas").onmousedown = function() {
	mouseDown = true;
}

document.getElementById("canvas").onwheel = function() {
	event.preventDefault();
	mouse.scroll.x += Math.round(event.deltaX * 0.1);
	mouse.scroll.y += Math.round(event.deltaY * 0.1);
}

function draw() {
	var offsetX = 0;
	var offsetY = 0;
	var canvas = document.getElementById("canvas").getContext("2d");
	for(var y = 0; y < window.innerHeight; y++) {
		for(var x = 0; x < window.innerWidth; x++) {
			offsetX = mouse.scroll.x + x;
			offsetY = mouse.scroll.y + y;
			canvas.fillStyle = picture[(offsetY * size.x) + offsetX];
			canvas.fillRect(x+1, y+1, 1, 1);
		}
	}
}

document.addEventListener("keydown", function(e) {
	if(e.keyCode == 17) {
		makeCircle(20, 20);
	}
});

setInterval(function() {
	hue = document.getElementById("color").value;
	var canvas = document.getElementById("canvas").getContext("2d");
	canvas.fillStyle = 'grey'
	canvas.fillRect(0, 0, window.innerWidth, window.innerHeight);
	draw();
	canvas.strokeStyle = 'black';
	canvas.strokeRect(mouse.x-3, mouse.y-3, 4, 4);
	if(mouse.x < window.innerWidth) {
		if(mouseDown) {
			var orginX = mouse.scroll.x;
			var orginY = mouse.scroll.y;
			var offX = (orginX-2) + mouse.x;
			var offY = ((orginY-2) + mouse.y) * size.x;
			var rgb = hue;
			picture[offY + offX] = rgb;
		}
	} else {
		drawMenu();
	}
}, 0);
