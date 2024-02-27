import cellThree from "./cellThree";

export default class effectThree {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
    imageGrid: cellThree[];
    mouse: {x: number | undefined, y: number | undefined, radius: number};

 constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 10;
    this.cellHeight = this. height / 15;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 60,
    }
    this.canvas.addEventListener('mousemove', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    })

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    })

 }
 createGrid() {
   let index = 0;
   for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        index++;
        this.imageGrid.unshift(new cellThree(this, x, y, index));
      }
   }
 }
 render(context: CanvasRenderingContext2D) {
    this.imageGrid.forEach(cell => {
      cell.update();
      cell.draw(context);
    })
 }
}