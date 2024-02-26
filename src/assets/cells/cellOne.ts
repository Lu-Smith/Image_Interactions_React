import effectOne from "./effectOne"

export default class cellOne {
    effect: effectOne;
    x: number;
    y: number;
    width: number;
    height: number;
    image: CanvasImageSource;
    slideX: number;
    slideY: number;
    vx: number;
    vy: number;
    ease: number;
    friction: number;

    constructor(effect: effectOne, x: number, y: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('Image1') as HTMLCanvasElement;
        this.slideX = 0;
        this.slideY = 0;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.05;
        this.friction = 0.8;
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
        // context.strokeRect(this.x, this.y, this.width, this.height);
    }
    update() {
        if (this.effect.mouse.x && this.effect.mouse.y) {
            const dx = this.effect.mouse.x - this.x;
            const dy = this.effect.mouse.y - this.y;

            const distance = Math.hypot(dx, dy);
            if (distance < this.effect.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = distance / this.effect.mouse.radius;
                this.vx = force * Math.cos(angle);
                this.vy = force * Math.sin(angle);
            } 
            this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
            this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
        }
    }
}