import mainEffect from "./mainEffect"

export default class mainCell {
    effect: mainEffect;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(effect: mainEffect, x: number, y: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
    }
    draw(context: CanvasRenderingContext2D) {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}