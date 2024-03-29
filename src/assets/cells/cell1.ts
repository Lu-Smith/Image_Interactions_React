import effect1 from "./effect1"

export default class cell1 {
    effect: effect1;
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
    positionX: number;
    positionY: number;
    speedX: number;
    speedY: number;
    randomize: number;
    index: number;

    constructor(effect: effect1, x: number, y: number, index: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.index = index;
        this.positionX = this.effect.width * 0.5;
        this.positionY = this.effect.height * 0.5;
        this.speedX = 0;
        this.speedY = 0;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('Image2') as HTMLCanvasElement;
        this.slideX = 0;
        this.slideY = 0;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.3;
        this.friction = 0.9;
        this.randomize = Math.random() * 30 + 2;
        setTimeout(() => {
            this.start();
        }, this.index * 4);
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, 
            this.width, this.height, this.positionX, this.positionY, this.width, this.height);
            context.strokeStyle = '#fcfefe';
            context.strokeRect(this.positionX, this.positionY, this.width, this.height);        
    }
    start() {
        this.speedX = (this.x - this.positionX)/this.randomize;
        this.speedY = (this.y - this.positionY)/this.randomize;
    }
    update() {
        //cell position
        if ( Math.abs(this.speedX) > 0.01 || Math.abs(this.speedY) > 0.01) {
            this.speedX = (this.x - this.positionX)/this.randomize;
            this.speedY = (this.y - this.positionY)/this.randomize;
            this.positionX += this.speedX;
            this.positionY += this.speedY;
        }
        //crop
        if (this.effect.mouse.x && this.effect.mouse.y) {
            const dx = this.effect.mouse.x - this.x;
            const dy = this.effect.mouse.y - this.y;
            const distance = Math.hypot(dx, dy);
            if (distance < this.effect.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = distance / this.effect.mouse.radius;
                this.vx = force * Math.cos(angle) * 2;
                this.vy = force * Math.sin(angle) * 6;
            } 
            this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
            this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
        }
    }
}