import mainCell from "./mainCell";

export default class mainEffect {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
    cell: mainCell;
    imageGrid: mainCell[];

 constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 35;
    this.cellHeight = this. height / 55;
    this.cell = new mainCell(this, 0, 0);
    this.imageGrid = [];
 }
 createGrid() {
   for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
         this.imageGrid.push(new mainCell(this, x, y));
      }
   }
 }
 render(context: CanvasRenderingContext2D) {
    this.cell.draw(context);
 }
}