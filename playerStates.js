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
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player){
        super("SITTING");
        this.player = player;
    }
    enter(){
        this.player.width = 128;
        this.player.height = 120;
        this.player.maxFrame = 1;
        this.player.frameY = 4.8;
        this.player.frameInterval = 1000/15;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(states.RUNNINGR, 1);
        } else if (input.includes("ArrowLeft") && this.player.x > 0) {
            this.player.setState(states.RUNNINGL, -0.3);
        } else if (input.includes(" ")){
            this.player.setState(states.ATTACK, 1);
        }
    }
}

export class RunningR extends State {
    constructor(player){
        super("RUNNINGR");
        this.player = player;
    }
    enter(){
        this.player.width = 300;
        this.player.height = 140;
        this.player.frameX = 0;
        this.player.maxFrame = 1;
        this.player.frameY = 1.8;
        this.player.frameInterval = 1000/5;
    }
    handleInput(input){
        if (input.includes("ArrowDown")){
            this.player.setState(states.SITTING, 0);
        } else if (input.includes("ArrowUp")){
            this.player.setState(states.JUMPING, 0);
        }
    }
}

export class Jumping extends State {
    constructor(player){
        super("JUMPING");
        this.player = player;
    }
    enter(){
        if (this.player.onGround()) this.player.vy -= 25;  //how tall the player jump
        this.player.width = 80;
        this.player.height = 110;
        this.player.frameX = 1;
        this.player.maxFrame = 5;
        this.player.frameY = 1;
        this.player.frameInterval = 1000/5;
    }
    handleInput(input){
        if (this.player.vy > this.player.weight){
            this.player.setState(states.FALLING, 0);
        } else if (input.includes(" ")){
            this.player.setState(states.ATTACK, 0);
        }
    }
}

export class Falling extends State {
    constructor(player){
        super("FALLING");
        this.player = player;
    }
    enter(){
        this.player.frameX = 3;
        this.player.maxFrame = 5;
        this.player.frameY = 1;
        this.player.frameInterval = 1000/5;
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(states.STAND, 0);
        } 
    }
}

export class RunningL extends State {
    constructor(player){
        super("RUNNINGL");
        this.player = player;
    }
    enter(){
        this.player.width = 85;
        this.player.height = 110;
        this.player.frameX = 0;
        this.player.maxFrame = 0;
        this.player.frameY = 3.7;
    }
    handleInput(input){
        if (input.includes("ArrowDown")){
            this.player.setState(states.SITTING, 0);
        } else if (input.includes("ArrowUp")){
            this.player.setState(states.JUMPING, 0);
        }
    }
}

export class Stand extends State {
    constructor(player){
        super("STAND");
        this.player = player;
    }
    enter(){
        this.player.width = 75;
        this.player.height = 110;
        this.player.frameX = 0;
        this.player.maxFrame = 3;
        this.player.frameY = 0;
        this.player.frameInterval = 1000/2;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(states.RUNNINGR, 1);
        } else if (input.includes("ArrowLeft") && this.player.x > 0) {
            this.player.setState(states.RUNNINGL, -0.3);
        } else if (input.includes(" ")){
            this.player.setState(states.ATTACK, 0);
        }
    }
}

export class Attack extends State {
    constructor(player){
        super("ATTACK");
        this.player = player;
    }
    enter(){
        this.player.width = 82;
        this.player.height = 110;
        this.player.frameX = 0;
        this.player.maxFrame = 4;
        this.player.frameY = 6.8;
        this.player.frameInterval = 1000/10;
    }
    handleInput(input){
        if (!input.includes(" ") && this.player.onGround()){
            this.player.setState(states.STAND, 0);
        } else if (!input.includes(" ") && !this.player.onGround()){
            this.player.setState(states.FALLING, 0);
        }
    }
}