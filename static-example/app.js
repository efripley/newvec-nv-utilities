function App(){
	this.init = function(){
		this.run();
	}

	this.run = function(){
		for(var ay = 0; ay < 25; ay++){
			for(var ax = 0; ax < 80; ax++){
				display.putc(nvRand(256), ax, ay, nvRand(16), nvRand(16));
			}
		}

		display.puts(" FPS: " + frameRate.update() + " ", 0, 0, display.WHITE, display.BLACK);

		display.flip();

		window.setTimeout(function(){app.run();}, 10);
	}
}

frameRate = new function(){
  this.time = new Date().getTime();
  this.frames = 0;
  this.fps = 0;

  this.update = function(){
    if(new Date().getTime() - this.time >= 1000){
      this.fps = this.frames;
      this.frames = 0;
      this.time = new Date().getTime();
    }
    else
      this.frames++;

    return this.fps;
  }
}

var display = new NVCLD("display1", "font");
var app = new App();
app.init();
