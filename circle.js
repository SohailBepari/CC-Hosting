let canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d');

let gravity = 0.45;
function Circle(y, radius){
    this.x = 150;
    this.y = y;
    this.radius = radius;
    this.vy = 0;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = 'red';
        c.fill();
        this.update();
    }
    this.update = () => {
        if(this.y - this.radius < 0)
            this.y = this.radius;
        this.y += this.vy;
        this.vy += gravity;
    }
    this.jump = () => {
        this.vy = -10;
    }
    this.hits = (object) => {
        return collideRectCircle(object.x, object.y, object.width,object.height, this.x, this.y, this.radius*2);
    }
}

function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {
    
    var testX = cx;
    var testY = cy;
  
    // which edge is closest?
    if (cx < rx){         testX = rx       // left edge
    }else if (cx > rx+rw){ testX = rx+rw  }   // right edge
  
    if (cy < ry){         testY = ry       // top edge
    }else if (cy > ry+rh){ testY = ry+rh }   // bottom edge
  
    // // get distance from closest edges
    var distance = dist(cx,cy,testX,testY);
    // if the distance is less than the radius, collision!
    if (distance <= diameter/2) {
      return true;
    }
    return false;
};

function dist(x1, y1, x2, y2){
    return Math.hypot(x1-x2, y1-y2);
};