class Particle {
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.97;
        if (this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 10 + 5;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 3;
        this.speedY = Math.random() * 3;
        this.color = "lightblue"
    };
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Fire extends Particle {
    constructor(game, x, y){
        super(game);
        this.image = document.getElementById("fire");
        this.size = Math.random() * 100 + 50;
        this.x = x;
        this.y =y;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 5;
    }
    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, this.size * 0.1, this.size * 5, this.size, this.size);
        context.restore();
    }
}