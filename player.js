import { Sitting, RunningR, Jumping, Falling, RunningL, Stand, Attack } from "./playerStates.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 80;
        this.height = 110;
        this.groundMargin = 50;  //ground height
        this.x = 0;
        this.y = this.game.height - this.height - this.groundMargin;
        this.vy = 0; //velocity
        this.weight = 1; //gravity
        this.image = document.getElementById("player");
        this.frameX = 0; //sprite sheet X direction
        this.frameY = 0; //sprite sheet Y direction
        this.maxFrame //adjust frame
        this.fps = 5; //adjust frame
        this.frameInterval = 1000 / this.fps;  //adjust frame
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states =[new Sitting(this), new RunningR(this), new Jumping(this), new Falling(this), new RunningL(this), 
                        new Stand(this), new Attack(this)];
        this.currentState = this.states[5];
        this.currentState.enter();
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontal movement
        this.x += this.speed;
        if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement 
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
       
        //Sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed *  speed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy =>{
            if(enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
                ){
                    enemy.markedForDeletion = true;
                    this.game.score++;
            } else {

            }
        })
    }
}