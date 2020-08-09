var showimg = null;
var hideimg = null;
var stego=null;
var showcan;
var hidecan;

function showimage() {
  var file = document.getElementById("showfile");
  showimg = new SimpleImage(file);
  showcan = document.getElementById("show");
  showimg.drawTo(showcan);
}

function hideimage() {
  var file = document.getElementById("hidefile");
  hideimg = new SimpleImage(file);
  hidecan = document.getElementById("hide");
  hideimg.drawTo(hidecan);
}
function clearcanvas() {
  doClear(showcan);
  doClear(hidecan);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
function clearbits(pixel){
    var x=Math.floor(pixel/16)*16;
    return x;
}
function chop2hide(image){
    for(var pixel of image.values()){
        pixel.setRed(clearbits(pixel.getRed()));
        pixel.setGreen(clearbits(pixel.getGreen()));
        pixel.setBlue(clearbits(pixel.getBlue()));
    }
    return image;
}
function shift(image){
    for(var pixel of image.values()){
        pixel.setRed(pixel.getRed()/16);
        pixel.setGreen(pixel.getGreen()/16);
        pixel.setBlue(pixel.getBlue()/16);
    }
    return image;
}
function combine(show,hide){
    var answer=new SimpleImage(show.getWidth(),show.getHeight());
    for (var px of answer.values()){
        var x=px.getX();
        var y=px.getY();
        var showpixel=show.getPixel(x,y);
        var hidepixel=hide.getPixel(x,y);
        px.setRed(showpixel.getRed()+hidepixel.getRed());
         px.setGreen(showpixel.getGreen()+hidepixel.getGreen());
        px.setBlue(showpixel.getBlue()+hidepixel.getBlue());
    }
    
    return answer;
}

function encrypt(){
var start=showimg;
var hide=hideimg;
start=chop2hide(start);
hide=shift(hide);
stego=combine(start,hide);
clearcanvas();
stego.drawTo(showcan);  
}

function decrypt(image){
    var answer=new SimpleImage(image.getWidth(),image.getHeight());
    for (var px of answer.values()){
        var x=px.getX();
        var y=px.getY();
        var imagepixel=image.getPixel(x,y);
        px.setRed((imagepixel.getRed()%16)*16);
        px.setGreen((imagepixel.getGreen()%16)*16);
        px.setBlue((imagepixel.getBlue()%16)*16);
    }
    return answer;
    
}
function decryption(){
  
var end=decrypt(stego);
end.drawTo(showcan);
}