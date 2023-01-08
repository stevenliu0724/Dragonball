class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.groundMargin = 50;
        this.fps = 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //check if offscreen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class Enemy1 extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 65;
        this.height = 75;
        this.x = this.game.width + Math.random() * this.game.height * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 2;
        this.image = document.getElementById("enemy1");
        this.angle = 0; //use for flying curve
        this.va = Math.random() * 0.1 + 0.5; //use for flying curve
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class Enemy2 extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 135;
        this.height = 160;
        this.x = this.game.width;
        this.y = this.game.height - this.height -this.groundMargin;
        this.speedX =0;
        this.speedY = 0;
        this.maxFrame = 2;
        this.frameInterval = 1000/10;
        this.image = document.getElementById("enemy2");
    }
}

export class Enemy3 extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 119;
        this.height = 140;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.groundMargin;
        this.speedX = 1;
        this.speedY = 0;
        this.maxFrame = 6;
        this.frameInterval = 1000/10;
        this.image = document.getElementById("enemy3");
    }
}