import { Dust, Fire } from "./Particle.js";


const states = {
    SITTING: 0,
    RUNNINGR: 1,
    JUMPING: 2,
    FALLING: 3,
    RUNNINGL: 4,
    STAND: 5,
    ATTACK: 6,
    KAME: 7,
    HIT: 8,
};

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game){
        super("SITTING", game);
    }
    enter(){
        this.game.player.width = 128;
        this.game.player.height = 120;
        this.game.player.maxFrame = 1;
        this.game.player.frameY = 4.8;
        this.game.player.frameInterval = 1000/15;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.game.player.setState(states.RUNNINGR, 2);
        } else if (input.includes("ArrowLeft") && this.game.player.x > 0) {
            this.game.player.setState(states.RUNNINGL, -0.3);
        } else if (input.includes(" ")){
            this.game.player.setState(states.ATTACK, 0);
        }  else if (input.includes("x")){
            this.game.player.setState(states.KAME, 0);
        }
    }
}

export class RunningR extends State {
    constructor(game){
        super("RUNNINGR", game);
    }
    enter(){
        this.game.player.width = 300;
        this.game.player.height = 140;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 1;
        this.game.player.frameY = 1.8;
        this.game.player.frameInterval = 1000/5;
    }
    handleInput(input){
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5,
             this.game.player.y + this.game.player.height));
        if (input.includes("ArrowDown")){
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes("ArrowUp")){
            this.game.player.setState(states.JUMPING, 0);
        }
    }
}

export class Jumping extends State {
    constructor(game){
        super("JUMPING", game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy -= 25;  //how tall the game.player jump
        this.game.player.width = 80;
        this.game.player.height = 110;
        this.game.player.frameX = 1;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 1;
        this.game.player.frameInterval = 1000/5;
    }
    handleInput(input){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 0);
        } else if (input.includes(" ")){
            this.game.player.setState(states.ATTACK, 0);
        }
    }
}

export class Falling extends State {
    constructor(game){
        super("FALLING", game);
    }
    enter(){
        this.game.player.width = 80;
        this.game.player.height = 110;
        this.game.player.frameX = 3;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 1;
        this.game.player.frameInterval = 1000/5;
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.STAND, 0);
        } 
    }
}

export class RunningL extends State {
    constructor(game){
        super("RUNNINGL", game);
    }
    enter(){
        this.game.player.width = 85;
        this.game.player.height = 110;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 0;
        this.game.player.frameY = 3.7;
    }
    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height));
        if (input.includes("ArrowDown")){
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes("ArrowUp")){
            this.game.player.setState(states.JUMPING, 0);
        }
    }
}

export class Stand extends State {
    constructor(game){
        super("STAND", game);
    }
    enter(){
        this.game.player.width = 75;
        this.game.player.height = 110;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 3;
        this.game.player.frameY = 0;
        this.game.player.frameInterval = 1000/5;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.game.player.setState(states.RUNNINGR, 2);
        } else if (input.includes("ArrowLeft") && this.game.player.x > 0) {
            this.game.player.setState(states.RUNNINGL, -0.3);
        } else if (input.includes(" ")){
            this.game.player.setState(states.ATTACK, 0);
        }
    }
}

export class Attack extends State {
    constructor(game){
        super("ATTACK", game);
    }
    enter(){
        this.game.player.width = 85;
        this.game.player.height = 110;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 6.8;
        this.game.player.frameInterval = 1000/10;
    }
    handleInput(input){
        if (!input.includes(" ") && this.game.player.onGround()){
            this.game.player.setState(states.STAND, 0);
        } else if (!input.includes(" ") && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 0);
        }
    }
}

export class Kame extends State {
    constructor(game){
        super("KAME", game);
    }
    enter(){
        this.game.player.width = 750;
        this.game.player.height = 350;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 1;
        this.game.player.frameY = 2.7;
        this.game.player.frameInterval = 1000/5;
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x, this.game.player.y + this.game.player.height));
        if (!input.includes("x") && this.game.player.onGround()){
            this.game.player.setState(states.STAND, 0);
        } else if (!input.includes("x") && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 0);
        }
    }
}