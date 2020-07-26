var canvas = document.getElementById("canvas");
var original = new MarvinImage();
var image;

original.load("chica_lentes.jpg", function(){
   // Draw the original image 
   original.draw(canvas);
});

function grayScale(){
	image = original.clone();
  Marvin.grayScale(original, image);
  image.draw(canvas);
}

function blackAndWhite(){
	image = original.clone();
  Marvin.blackAndWhite(original, image, 20);
  image.draw(canvas);
}

function thresholding(){
	image = original.clone();
  Marvin.thresholding(original, image, 160);
  image.draw(canvas);
}

function sepia(){
  image = original.clone();
  Marvin.sepia(original, image, 30);
  image.draw(canvas);
}

function emboss(){
  image = original.clone();
  Marvin.emboss(original, image, 30);
  image.draw(canvas);
}

function halftone(){
  image = original.clone();
	Marvin.halftoneErrorDiffusion(original, image);
  image.draw(canvas);
}

function invert(){
	image = original.clone();
	Marvin.invertColors(original, image);
  image.draw(canvas);
}

function edgeDetection1(){
	image = original.clone();
  image.clear(0xFF000000);
	Marvin.prewitt(original, image);
	image.draw(canvas);
}

function edgeDetection2(){
	image = original.clone();
  image.clear(0xFF000000);
	Marvin.prewitt(original, image);
	Marvin.invertColors(image, image);
	Marvin.thresholding(image, image, 200);
	image.draw(canvas);
}

function crop(){
  image = original.clone();
	Marvin.crop(original, image, 140, 165, 125, 50);
	canvas.getContext("2d").clearRect(0,0,canvas.width, canvas.height);
	image.draw(canvas);
}

function scale(){
	image = original.clone();
	Marvin.scale(original, image, 200);
	canvas.getContext("2d").clearRect(0,0,canvas.width, canvas.height);
	image.draw(canvas);
}

function reset(){
	original.draw(canvas);
}

