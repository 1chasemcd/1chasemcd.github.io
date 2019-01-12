
// Hold class and methods
class Hold {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  dist(x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
  }
}

// Wall class and methods
function Wall(canvas, bgImg) {
  this.normal = 0;
  this.start = 1;
  this.end = 2;

  this.radius = 0.03;
  this.holds = [];
  this.canvas = canvas;
  this.bgImg = bgImg;

  // Setup wall
  this.ctx = this.canvas.getContext("2d");
  this.draw();
}

Wall.prototype.changeCanvas = function(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.draw();
}

Wall.prototype.update = function(x, y) {
  if (this.holdAt(x, y)) {
    this.holdAt(x, y).type ++;

    if (this.holdAt(x, y).type > 2) {
      this.remove(x, y);
    }
  } else {
    this.add(new Hold(x, y, 0));
  }
}

Wall.prototype.draw = function() {
  this.ctx.drawImage(this.bgImg, 0, 0, this.canvas.width, this.canvas.height);
  this.ctx.lineWidth = 0.01 * this.canvas.width;

  for (var i = 0; i < this.holds.length; i++) {
    if (this.holds[i].type == this.start) {
      this.ctx.strokeStyle = "#0c0";
    } else if (this.holds[i].type == this.normal) {
      this.ctx.strokeStyle = "#33f";
    } else if (this.holds[i].type == this.end) {
      this.ctx.strokeStyle = "#f00";
    }

    this.ctx.beginPath();
    this.ctx.ellipse(this.holds[i].x * this.canvas.width,
      this.holds[i].y * this.canvas.height, this.radius * this.canvas.width,
      this.radius * this.canvas.width, 0, 0, Math.PI*2);
    this.ctx.stroke();
  }
}

Wall.prototype.add = function(hold) {
  this.holds.push(hold);
}

Wall.prototype.remove = function(x, y) {
  for (var i = 0; i < this.holds.length; i++) {
    if (this.holds[i].dist(x, y) <= this.radius) {
      this.holds.splice(i, 1);
    }
  }
}

Wall.prototype.holdAt = function(x, y) {
  for (var i = 0; i < this.holds.length; i++) {
    if (this.holds[i].dist(x, y) <= this.radius) {
      return this.holds[i];
    }
  }

  return false;
}
