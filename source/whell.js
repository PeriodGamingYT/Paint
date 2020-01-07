function makeWheel(x, y) {
  var canvas = document.getElementById("canvas").getContext("2d");
  // If it is not the right data type, we halt the function by returning -1.
  if(typeof(x) != 'number' || typeof(y) != 'number') {
    return -1;
  }
  var radius = 50;
  var image = canvas.createImageData(radius * 2, radius * 2);
  var data = image.data;
  for(var y = -radius; y < radius; y++) {
    for(var x = -radius; x < radius; x++) {
      var dist = Math.sqrt(x*x + y*y);
      if(dist > radius) {
        continue; // We will skip it because it is out of the circle.
      }
      var rowLen = radius * 2,
        aX = x + radius,
        aY = y + radius,
        pixWdth = 4,
        index = (aX + (aY * rowLen)) * pixWdth;
      data[index] = 0;
      data[index+1] = 255;
      data[index+2] = 0;
      data[index+3] = 255;
    }
  }
}
