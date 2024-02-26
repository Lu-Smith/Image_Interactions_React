import cellOne from "./cellOne";

export default class effectOne {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
    imageGrid: cellOne[];
    mouse: {x: number | undefined, y: number | undefined, radius: number};

 constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 15;
    this.cellHeight = this. height / 35;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 80,
    }
    this.canvas.addEventListener('mousemove', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    })

    this.canvas.addEventListener('mouseleave', e => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
      console.log(e)
    })

 }
 createGrid() {
   for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
         this.imageGrid.push(new cellOne(this, x, y));
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