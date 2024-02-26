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
    vx: number;

    constructor(effect: mainEffect, x: number, y: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('mainImage') as HTMLCanvasElement;
        this.slideX = 0;
        this.slideY = 0;
        this.vx = 0;
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
    update() {
        // if (this.effect.mouse.x && this.effect.mouse.y) {
            const dx = this.effect.mouse.x - this.x;
            const dy = this.effect.mouse.y - this.y;

            const distance = Math.hypot(dx, dy);
            if (distance < this.effect.mouse.radius) {
                const force = distance / this.effect.mouse.radius;
                this.vx = force;
            } else {
                this.vx = 0;
            }
            this.slideX += this.vx;
            this.slideY += this.vx;
         
        // }
    }
}