import cell1 from "./cell1";
import cell2 from "./cell2";
import cell3 from "./cell3";
import cell4 from "./cell4";
import cell5 from "./cell5";
import cell6 from "./cell6";

export default class effect1 {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
    imageGrid: (cell1 | cell2 | cell3 | cell4 | cell5 | cell6)[];
    mouse: {x: number | undefined, y: number | undefined, radius: number};

 constructor(canvas: HTMLCanvasElement, radiusOne: number, columnCells: number, rowCells: number, imageNumber: number) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / columnCells;
    this.cellHeight = this. height / rowCells;
    this.imageGrid = [];
    this.createGrid(imageNumber);
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: radiusOne,
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
 createGrid(imageNumber: number) {
  let index = 0;
   for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        index++;
        if (imageNumber === 1) {
          this.imageGrid.unshift(new cell1(this, x, y, index));
        } else if (imageNumber === 2) {
          this.imageGrid.unshift(new cell2(this, x, y, index));
        } else if(imageNumber === 3) {
          this.imageGrid.unshift(new cell3(this, x, y));
        } else if(imageNumber === 4) {
          this.imageGrid.unshift(new cell4(this, x, y, index));
        } else if(imageNumber === 5) {
          this.imageGrid.unshift(new cell5(this, x, y, index));
        } else {
          this.imageGrid.unshift(new cell6(this, x, y, index));
        }
      }
   }
 }
 render(context: CanvasRenderingContext2D) {
    this.imageGrid.forEach((cell) => {
      cell.update();
      cell.draw(context);
    })
 }
}