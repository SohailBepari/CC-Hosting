let canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let height = window.innerHeight;
let width = window.innerWidth;

let c = canvas.getContext('2d');

let maxRadius = 75;
let gravity = 0.1;

let mouse = {
    x : undefined ,
    y : undefined
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, radius,minRadius, dx, dy, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = minRadius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
        this.update();
    }
    this.update = function(){
        if(this.x + this.radius > width || this.x-this.radius < 0)
            this.dx = -this.dx;
        if(this.y + this.radius > height || this.y - this.radius < 0)
            this.dy = -this.dy*0.9;

        this.x += this.dx;
        this.y += this.dy;

        this.dy += gravity;

        if(Math.abs(mouse.x - this.x) < 75 && Math.abs(mouse.y - this.y) < 75){
            (this.radius > maxRadius)?null : this.radius++;
        }
        else{
            (this.radius < this.minRadius)?null : this.radius--;  
        }
    }
}
let circleArray = [];
for(let i =0; i < 50; i++){
    let radius = Math.random()*(5) + 15;                 
    let x = Math.random()*((width-radius) - (radius)) + radius;
    let y = Math.random()*((height-radius) - (radius)) + radius;
    let dx = Math.random()*(4 - -4) - 4;
    let dy = Math.random()*(4 - -4) - 4;
    let colorArray = ['#FC7F6D', '#F46255', '#67696B','#C8CDCC','#FF0000'];
    let colorNumber = Math.floor(Math.random()*colorArray.length);
    circleArray.push(new Circle(x, y, radius, radius, dx, dy, colorArray[colorNumber]));
}

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 1)';
    c.fillRect(0, 0, width, height);
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].draw();
    }
}

animate();

