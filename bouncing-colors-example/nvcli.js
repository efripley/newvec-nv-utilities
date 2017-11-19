//New Vec Digital Command Line Interface
//Version 1.0
//Last Updated 10/21/2016

function NVCLI(){
	this.init = function(container, font){
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.charHeight = 16;
		this.charWidth = 8;
		this.asciiWidth = 80;
		this.asciiHeight = 25;
		this.canvas.height = this.charHeight * this.asciiHeight;
		this.canvas.width = this.charWidth * this.asciiWidth;

		document.getElementById(container).appendChild(this.canvas);

		this.BLACK = 0;
		this.DARKGRAY = 1;
		this.LIGHTGRAY = 2;
		this.WHITE = 3;
		this.RED = 4;
		this.GREEN = 5;
		this.BLUE = 6;
		this.YELLOW = 7;
		this.CYAN = 8;
		this.MAGENTA = 9;
		this.DARKRED = 10;
		this.DARKGREEN = 11;
		this.DARKBLUE = 12;
		this.DARKYELLOW = 13;
		this.DARKCYAN = 14;
		this.DARKMAGENTA = 15;

		this.fonts = [];
		this.fonts.push(document.getElementById(font));
		this.fonts[0].style.display = "none";
		while(!this.fonts[0].complete){};

    this.fonts.push(this.genFontColor(this.DARKGRAY));
    this.fonts.push(this.genFontColor(this.LIGHTGRAY));
    this.fonts.push(this.genFontColor(this.WHITE));
    this.fonts.push(this.genFontColor(this.RED));
    this.fonts.push(this.genFontColor(this.GREEN));
    this.fonts.push(this.genFontColor(this.BLUE));
    this.fonts.push(this.genFontColor(this.YELLOW));
    this.fonts.push(this.genFontColor(this.CYAN));
    this.fonts.push(this.genFontColor(this.MAGENTA));
    this.fonts.push(this.genFontColor(this.DARKRED));
    this.fonts.push(this.genFontColor(this.DARKGREEN));
    this.fonts.push(this.genFontColor(this.DARKBLUE));
    this.fonts.push(this.genFontColor(this.DARKYELLOW));
    this.fonts.push(this.genFontColor(this.DARKCYAN));
    this.fonts.push(this.genFontColor(this.DARKMAGENTA));

		this.backBuffer = new nvArray2D(this.asciiWidth, this.asciiHeight, null);
		this.frontBuffer = new nvArray2D(this.asciiWidth, this.asciiHeight, null);

		this.initBuffers();
		this.initDisplay();
	}

  this.genFontColor = function(color){
    var red = 0;
    var green = 0;
    var blue = 0;
    var alpha = 255;

    if(color == this.DARKGRAY){
      red = 80;
      green = 80;
      blue = 80;
    }
    else if(color == this.LIGHTGRAY){
      red = 207;
      green = 207;
      blue = 207;
    }
    else if(color == this.WHITE){
      red = 255;
      green = 255;
      blue = 255;
    }
    else if(color == this.RED){
      red = 255;
      green = 0;
      blue = 0;
    }
    else if(color == this.GREEN){
      red = 0;
      green = 255;
      blue = 0;
    }
    else if(color == this.BLUE){
      red = 0;
      green = 0;
      blue = 255;
    }
    else if(color == this.YELLOW){
      red = 255;
      green = 255;
      blue = 0;
    }
    else if(color == this.CYAN){
      red = 0;
      green = 255;
      blue = 255;
    }
    else if(color == this.MAGENTA){
      red = 255;
      green = 0;
      blue = 255;
    }
    else if(color == this.DARKRED){
      red = 127;
      green = 0;
      blue = 0;
    }
    else if(color == this.DARKGREEN){
      red = 0;
      green = 127;
      blue = 0;
    }
    else if(color == this.DARKBLUE){
      red = 0;
      green = 0;
      blue = 127;
    }
    else if(color == this.DARKYELLOW){
      red = 127;
      green = 127;
      blue = 0;
    }
    else if(color == this.DARKCYAN){
      red = 0;
      green = 127;
      blue =127;
    }
    else if(color == this.DARKMAGENTA){
      red = 127;
      green = 0;
      blue =127;
    }

    var imageCanvas = document.createElement('canvas');
    var imageContext = imageCanvas.getContext('2d');

    imageCanvas.width = this.fonts[0].width;
    imageCanvas.height = this.fonts[0].height;
    imageContext.drawImage(this.fonts[0], 0, 0 );
    var image = imageContext.getImageData(0, 0, this.fonts[0].width, this.fonts[0].height);

    for (var a = 0; a < image.data.length; a += 4){
      if(image.data[a + 3] == 255){
        image.data[a] = red;
        image.data[a + 1] = green;
        image.data[a + 2] = blue;
      }
    }

    imageContext.putImageData(image, 0, 0);

    var returnImage = new Image();
    returnImage.src = imageCanvas.toDataURL();

    //document.body.appendChild(returnImage);
    return returnImage;
  }

	this.initBuffers = function(){
		for(var ay = 0; ay < this.asciiHeight; ay++){
			for(var ax = 0; ax < this.asciiWidth; ax++){
				this.frontBuffer[ax][ay] = {char:32, color:this.WHITE, back:this.BLACK};
				this.backBuffer[ax][ay] = {char:32, color:this.WHITE, back:this.BLACK};
			}
		}
	}

	this.initDisplay = function(){
		for(var ay = 0; ay < this.asciiHeight; ay++){
			for(var ax = 0; ax < this.asciiWidth; ax++){
				var x = ax * this.charWidth;
				var y = ay * this.charHeight;
				var width = this.charWidth;
				var height = this.charHeight;
				var sourceX = parseInt(this.backBuffer[ax][ay].char % 32) * width;
				var sourceY = parseInt(this.backBuffer[ax][ay].char / 32) * height;

				this.context.drawImage(this.fonts[this.backBuffer[ax][ay].color], sourceX, sourceY, width, height, x, y, width, height);
			}
		}
	}

	this.clear = function(x, y, width, height){
		for(var ay = y; ay < y + height; ay++){
			for(var ax = x; ax < x + width; ax++){
				this.backBuffer[ax][ay].char = 0;
				this.backBuffer[ax][ay].color = this.WHITE;
				this.backBuffer[ax][ay].back = this.BLACK;
			}
		}
	}

	this.putc = function(char, x, y, color, back){
		if(char !== parseInt(char, 10))
			char = char.charCodeAt(0);

		this.backBuffer[x][y].char = char;
		this.backBuffer[x][y].color = color;
		this.backBuffer[x][y].back = back;
	}

	this.puts = function(string, x, y, color, back){
		var length = string.length;
		if(x + string.length >= this.asciiWidth)
			length = asciiWidth - x;

		for(a = 0; a < length; a++){
			this.putc(string.charAt(a), x + a, y, color, back);
		}
	}

	this.setColor = function(color){
		if(color == this.BLACK)
			this.context.fillStyle = "#000";
		else if(color == this.DARKGRAY)
			this.context.fillStyle = "#555";
		else if(color == this.GRAY)
			this.context.fillStyle = "#CCC";
		else if(color == this.WHITE)
			this.context.fillStyle = "#fff";
		else if(color == this.RED)
			this.context.fillStyle = "#f00";
		else if(color == this.GREEN)
			this.context.fillStyle = "#0f0";
		else if(color == this.BLUE)
			this.context.fillStyle = "#00f";
		else if(color == this.YELLOW)
			this.context.fillStyle = "#ff0";
		else if(color == this.CYAN)
			this.context.fillStyle = "#0ff";
		else if(color == this.MAGENTA)
			this.context.fillStyle = "#f0f";
		else if(color == this.DARKRED)
			this.context.fillStyle = "#800";
		else if(color == this.DARKGREEN)
			this.context.fillStyle = "#080";
		else if(color == this.DARKBLUE)
			this.context.fillStyle = "#008";
		else if(color == this.DARKYELLOW)
			this.context.fillStyle = "#880";
		else if(color == this.DARKCYAN)
			this.context.fillStyle = "#088";
		else if(color == this.DARKMAGENTA)
			this.context.fillStyle = "#808";
	}

	this.bufferUpdated = function(x, y){
		return this.backBuffer[x][y].char != this.frontBuffer[x][y].char ||
		       this.backBuffer[x][y].color != this.frontBuffer[x][y].color ||
		       this.backBuffer[x][y].back != this.frontBuffer[x][y].back;
	}

	this.copyBuffer = function(x, y){
		this.frontBuffer[x][y].char = this.backBuffer[x][y].char;
		this.frontBuffer[x][y].color = this.backBuffer[x][y].color;
		this.frontBuffer[x][y].back = this.backBuffer[x][y].back;
	}

	this.flip = function(){
		for(var ay = 0; ay < 25; ay++){
			for(var ax = 0; ax < 80; ax++){
				if(this.bufferUpdated(ax, ay)){
					this.copyBuffer(ax, ay);

					var x = ax * this.charWidth;
					var y = ay * this.charHeight;
					var width = this.charWidth;
					var height = this.charHeight;
					var sourceX = parseInt(this.backBuffer[ax][ay].char % 32) * width;
					var sourceY = parseInt(this.backBuffer[ax][ay].char / 32) * height;

          this.setColor(this.backBuffer[ax][ay].back);
					this.context.fillRect(x, y, width, height);

					this.context.drawImage(this.fonts[this.backBuffer[ax][ay].color], sourceX, sourceY, width, height, x, y, width, height);
				}
			}
		}

		this.clear(0, 0, this.asciiWidth, this.asciiHeight);
	}
}
