import mainEffect from "./mainEffect"

export default class mainCell {
    effect: mainEffect;
    x: number;
    y: number;
    width: number;
    height: number;
    image: CanvasImageSource;
    slideX: number;
    slideY: number;

    constructor(effect: mainEffect, x: number, y: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('mainImage') as HTMLCanvasElement;
        this.slideX = 0;
        this.slideY = Math.random() * 2;
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.slideX += 1;
    }
}