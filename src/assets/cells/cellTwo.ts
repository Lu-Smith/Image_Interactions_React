import effectTwo from "./effectTwo"

export default class cellTwo {
    effect: effectTwo;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLCanvasElement;
    slideX: number;
    slideY: number;
    vx: number;
    vy: number;
    ease: number;
    friction: number;

    constructor(effect: effectTwo, x: number, y: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('Image3') as HTMLCanvasElement;
        this.slideX = 0;
        this.slideY = 0;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.08;
        this.friction = 0.84;
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update() {
        if (this.effect.mouse.x && this.effect.mouse.y) {
            const dx = this.effect.mouse.x - this.x;
            const dy = this.effect.mouse.y - this.y;

            const distance = Math.hypot(dx, dy);
            if (distance < this.effect.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = distance / this.effect.mouse.radius * 5;
                this.vx = force * Math.sin(angle);
                this.vy = force * Math.cos(angle);
            } 
            this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
            this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
        }
    }
}