import { Sitting, Running, Jumping, Falling } from "./playerStates.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 75;
        this.height = 110;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0; //velocity
        this.weight = 1; //gravity
        this.image = document.getElementById("player");
        this.frameX = 0; //sprite sheet X direction
        this.frameY = 0; //sprite sheet Y direction
        this.speed = 0;
        this.maxSpeed = 10;
        this.states =[new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input){
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
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround(){
        return this.y >= this.game.height - this.height;
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}