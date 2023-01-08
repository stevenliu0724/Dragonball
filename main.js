import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { Enemy1, Enemy2, Enemy3 } from './enemies.js';
import { UI } from './UI.js';

window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1500;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMarin = 80; //ground height
            this.speed = 0; //background speed
            this.maxSpeed = 6;  //background maxspeed
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.maxParticles = 30;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false; //press 'd' to show the rectangle
            this.score = 0;
            this.fontColor = "white";
            this.player.currentState = this.player.states[5];
            this.player.currentState.enter();
        }
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handle enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            //handle particle
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(index, 1);
            });
            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
            }
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new Enemy2(this));
            else if (this.speed > 0) this.enemies.push(new Enemy3(this));
            this.enemies.push(new Enemy1(this));
        };
    }
    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});