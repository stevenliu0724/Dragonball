export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Arial";
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily; //px format require a space after x
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        context.fillText("Score: " + this.game.score, 20, 50);
    }
}