var canvas = document.getElementById("canvas");
var original = new MarvinImage();
var image;

original.load("chica_lentes.jpg", function(){
   // Draw the original image 
   original.draw(canvas);
});



function edgeDetection2(){
	image = original.clone();
  image.clear(0xFF000000);
	Marvin.prewitt(original, image);
	Marvin.invertColors(image, image);
	Marvin.thresholding(image, image, 200);
	image.draw(canvas);
}



