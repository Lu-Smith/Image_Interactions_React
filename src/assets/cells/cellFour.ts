import effectFour from "./effectFour"

export default class cellFour {
    effect: effectFour;
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
    positionX: number;
    positionY: number;
    speedX: number;
    speedY: number;
    randomize: number;
    index: number;

    constructor(effect: effectFour, x: number, y: number, index: number) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.index = index;
        this.positionX = this.effect.width * 0.4;
        this.positionY = this.effect.height * 1.3;
        this.speedX = 0;
        this.speedY = 0;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('Image5') as HTMLCanvasElement;
        this.slideX = 0;
        this.slideY = 0;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.08;
        this.friction = 0.7;
        this.randomize = Math.random() * 40 + 8;
        setTimeout(() => {
            this.start();
        }, this.index * 3);
    }
    draw(context: CanvasRenderingContext2D) {
        setTimeout(() => {
            context.strokeStyle = 'pink';
            context.strokeRect(this.positionX, this.positionY, this.width, this.height);
        }, this.index * 2);  
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
                this.vx = force * Math.sin(angle) * 2;
                this.vy = force * Math.cos(angle) * 3;
            } 
            this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
            this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
        }
    }
}