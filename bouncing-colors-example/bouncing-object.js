function BouncingObject(argChar, argColor, argBack){
  var char = argChar;
  var color = argColor;
  var back = argBack;
  var x = nvRand(80);
  var y = nvRand(25);
  var dirX = 0;
  var dirY = 0;

  while(dirX == 0 && dirY == 0){
    dirX = nvRand(3) - 1;
    dirY = nvRand(3) - 1;
  }

  this.update = function(){
    x += dirX;
    y += dirY;

    if(x >= 80 || x < 0){
      x -= dirX;
      dirX = -dirX;
    }
    if(y >= 25 || y < 0){
      y -= dirY;
      dirY = -dirY;
    }
  }

  this.draw = function(){
    display.putc(char, x, y, color, back);
  }
}
