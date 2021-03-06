function hsv2rgb(hue, saturation, value) {
    let chroma = value * saturation;
    let hue1 = hue / 60;
    let x = chroma * (1- Math.abs((hue1 % 2) - 1));
    let r1, g1, b1;
    if (hue1 >= 0 && hue1 <= 1) {
      ([r1, g1, b1] = [chroma, x, 0]);
    } else if (hue1 >= 1 && hue1 <= 2) {
      ([r1, g1, b1] = [x, chroma, 0]);
    } else if (hue1 >= 2 && hue1 <= 3) {
      ([r1, g1, b1] = [0, chroma, x]);
    } else if (hue1 >= 3 && hue1 <= 4) {
      ([r1, g1, b1] = [0, x, chroma]);
    } else if (hue1 >= 4 && hue1 <= 5) {
      ([r1, g1, b1] = [x, 0, chroma]);
    } else if (hue1 >= 5 && hue1 <= 6) {
      ([r1, g1, b1] = [chroma, 0, x]);
    }
    
    let m = value - chroma;
    let [r,g,b] = [r1+m, g1+m, b1+m];
    
    // Change r,g,b values from [0,1] to [0,255]
    return [255*r,255*g,255*b];
}

function rad2deg(rad) {
    return (rad + Math.PI) / (2 * Math.PI) * 360;
}

function xy2polar(x, y) {
    let r = Math.sqrt(x * x + y * y);
    let phi = Math.atan2(y, x);
    return [r, phi];
}

function makeWheel(x, y) {
  var canvas = document.getElementById("canvas").getContext("2d");
	  var radius = 50;
	  var image = canvas.createImageData(radius * 2, radius * 2);
	  var data = image.data;
	  for(var y = -radius; y < radius; y++) {
	    for(var x = -radius; x < radius; x++) {
	    	  var dist = Math.sqrt(x*x + y*y);
	    	  if(dist > radius) {
	    	    continue; // We will skip it because it is out of the circle.
	    	  }
	    	  let [rad, phi] = xy2polar(x, y);
	    	  var rowLen = radius * 2,
	    	    aX = x + radius,
	    	    aY = y + radius,
	    	    pixWdth = 4,
	    	    index = (aX + (aY * rowLen)) * pixWdth;
	    	  var deg = rad2deg(phi);
	    	  var [r, g, b] = hsv2rgb(deg, rad / radius, 1.0);
	    	  data[index] = r;
	    	  data[index+1] = g;
	    	  data[index+2] = b;
      	  		data[index+3] = 255;
    		}
  		}
  	  canvas.putImageData(image, x, y);
}
