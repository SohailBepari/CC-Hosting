
let vx = 4;

function Pipe(x, y, height, width){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    this.draw = () => {
        c.beginPath();
        c.fillStyle = ' #00ff00';
        c.lineWidth = '3';
        c.strokeStyle = 'black';
        c.rect(this.x, this.y, this.width, this.height);  
        c.stroke();  
        c.fill();
        c.closePath();
    }
    this.move = () => {
        this.x -= vx;
    }
}