import mainEffect from "./mainEffect"

export default class mainCell {
    effect: mainEffect;
    x: number;
    y: number;
    width: number;
    height: number;
    image: CanvasImageSource;

    constructor(effect: mainEffect, x: number, y: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('mainImage') as HTMLCanvasElement;
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height, this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}