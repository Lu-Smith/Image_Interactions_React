import mainCell from "./mainCell";

export default class mainEffect {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
    cell: mainCell;

 constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 35;
    this.cellHeight = this. height / 55;
    this.cell = new mainCell(this, 0, 0);
 }
 render(context: CanvasRenderingContext2D) {
    this.cell.draw(context);
 }
}