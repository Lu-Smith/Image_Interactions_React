import cellTwo from "./cellTwo";

export default class effectTwo {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
    imageGrid: cellTwo[];
    mouse: {x: number | undefined, y: number | undefined, radius: number};

 constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 14;
    this.cellHeight = this. height / 30;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 40,
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
   for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
         this.imageGrid.push(new cellTwo(this, x, y));
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