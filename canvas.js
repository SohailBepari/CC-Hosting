
let circle = new Circle(window.innerHeight/2, 10);
window.addEventListener('keypress', (event) => {
    if(event.keyCode == 32)
        circle.jump();
})

let pipeArray = [];

let continueAnimating = true;
let points = 0;
let interval = undefined;
function startRender(){
    let val = setInterval(() => {
        let width = 50;
        let x = window.innerWidth + width;
        let dist = 200;
        let height = Math.random()*(300) + 50;
        let yBottom = height + dist;
        let heightBottom = window.innerHeight - yBottom; 
    
        pipeArray.push(new Pipe(x, 0, height, width));
        pipeArray.push(new Pipe(x, yBottom, heightBottom, width));
        
    }, 1000);    
    interval = val;
}

function animate(){
    if(continueAnimating)
        requestAnimationFrame(animate);
    points += 0.2;
    let stop = false;
    getScore();
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circle.draw();
    pipeArray.forEach((pipe) => {
        pipe.draw();
        pipe.move();
        if(circle.hits(pipe)){
            stop = true;
        }
    })
    
    if(circle.y + circle.radius >= window.innerHeight || stop){
        continueAnimating = false;
        c.font = '50px Georgia';
        c.fillStyle = 'black';
        c.fillText('GAME OVER', 520, 300);
        c.font = '30px Georgia';
        c.fillText('Points: ' + Math.floor(points), 580, 200);
        start.style.display = 'block';
    }
}

let start = document.getElementsByClassName('start')[0];

function gameStart(){
    pipeArray = [];
    circle.y = window.innerHeight/2;
    circle.vy = 0;
    points=0;
    continueAnimating = true;
    start.style.display = 'none';
    clearInterval(interval);
    startRender();
    animate();
}

function getScore(){
    points += 0.1;
    c.font = '30px Georgia';
    c.fillStyle = 'black';
    c.fillText('Score :' + Math.floor(points), 520,300);
}