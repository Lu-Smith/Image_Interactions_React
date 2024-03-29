import effect1 from "./effect1"

export default class cell2 {
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
        this.positionX = 10;
        this.positionY = this.effect.height * 0.1;
        this.speedX = 0;
        this.speedY = 0;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('Image1') as HTMLCanvasElement;
        this.slideX = 0;
        this.slideY = 0;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.05;
        this.friction = 0.8;
        this.randomize = Math.random() * 50 + 2;
        setTimeout(() => {
            this.start();
        }, this.index);
    }
    draw(context: CanvasRenderingContext2D) {
        setTimeout(() => {
        context.fillStyle = '#f1b963';
        context.fillRect(this.x, this.y, this.width, this.height); 
        context.strokeStyle = 'white';
        context.strokeRect(this.x, this.y, this.width, this.height); 
    }, this.index);
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, 
            this.width, this.height, this.positionX, this.positionY, this.width, this.height);
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