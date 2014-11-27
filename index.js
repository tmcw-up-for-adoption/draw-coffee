var canvas = document.createElement('canvas');


function coffeeTime(canvas, inside, atop) {
    canvas.width = 300;
    canvas.height = 300;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    // draw the cylinder
    ctx.globalCompositeOperation = 'source-over';

    ctx.moveTo(75 + 10, 50);
    ctx.bezierCurveTo(75 + 10, 10, 225 - 10, 10, 225 - 10, 50);
    ctx.bezierCurveTo(225 - 10, 100 - 10, 75 + 10, 100 - 10, 75 + 10, 50);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-atop';

    // things in the mug
    if (inside) inside(ctx);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#fff';

    ctx.moveTo(75, 50);
    ctx.bezierCurveTo(75, 0, 225, 0, 225, 50);
    ctx.bezierCurveTo(225, 100, 75, 100, 75, 50);
    ctx.fill();

    ctx.beginPath();
    ctx.rect(75, 50, 150, 150);
    ctx.moveTo(75, 200);
    ctx.bezierCurveTo(75, 250, 225, 250, 225, 200);
    ctx.fill();

    ctx.lineWidth = 25;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(225, 80);
    ctx.bezierCurveTo(280, 80, 280, 170, 220, 170);
    ctx.stroke();

    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ddd';
    ctx.moveTo(75 + 10, 50 + 20);
    ctx.bezierCurveTo(75 + 20 + 10, 100 - 5, 225 - 30, 100 - 5, 225 - 10, 50 + 20);
    ctx.stroke();

    if (atop) {
        atop(ctx);
    }
}
var howMuch = 0;
var balls = [];

setInterval(function() {
    howMuch += 5;
    coffeeTime(canvas, function(ctx) {
        ctx.fillStyle = 'brown';
        ctx.beginPath();
        ctx.moveTo(75, 80 - howMuch);

        ctx.bezierCurveTo(75, 80 - 0 - howMuch,
                          225, 80 - 30 - howMuch - Math.cos(Date.now()/500) * 20,
                          225, 80 + 20 - howMuch - Math.sin(Date.now()/500) * 20,
                          225, 80 - howMuch);
                          ctx.lineTo(250, 200);
                          ctx.lineTo(75, 200);
                          ctx.fill();
                          ctx.beginPath();
    }, function(ctx) {
        ctx.fillStyle = 'brown';
        ctx.beginPath();
        if (howMuch > 80) {
            balls.forEach(function(ball) {
                ctx.rect(ball.x, 50, 8, (howMuch - 80) * 2 * ball.speed);
                ctx.fill();
                ctx.beginPath();
            });
        }
    });
    if (howMuch > 100) {
        howMuch = 0;
        balls = [];
        for (var i = 0; i < Math.random() * 20; i++) {
            balls.push({ x: (Math.floor(Math.random() * 10) * 10) + 95, speed: Math.random() * 2 });
        }
    }
}, 100);

//=canvas
