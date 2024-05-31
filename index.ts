const menu = <HTMLDivElement>document.getElementById("aside");
const main = <HTMLDivElement>document.getElementById("main");
console.log(main);

interface Cell {
  canv: HTMLCanvasElement;
  readonly x: number;
  readonly y: number;
}
interface Coords {
  x: number;
  y: number;
}

class Select implements Cell {
  canv: HTMLCanvasElement;
  x: number;
  y: number;
  constructor(cd: Coords) {
    this.x = cd.x;
    this.y = cd.y;

    this.canv = document.createElement("canvas");

    this.canv.width = 24;
    this.canv.height = 24;
    const ctx = this.canv.getContext("2d")!;
    const img = new Image();
    img.src = "./sprites.png";
    img.onload = () => {
      ctx.filter = "brightness(50%)";
      ctx.drawImage(img, this.x * 48, this.y * 48, 48, 48, 0, 0, 24, 24);
    };

    this.canv.addEventListener("mouseover", () => {
      ctx.filter = "brightness(200%)";
      ctx.drawImage(this.canv, 0, 0);
    });
    this.canv.addEventListener("mouseleave", () => {
      ctx.filter = "brightness(50%)";
      ctx.drawImage(this.canv, 0, 0);
    });
    this.canv.addEventListener("click", () => {
      selected.forEach((element) => {
        element.ctx.drawImage(this.canv, 0, 0);
      });
    });
  }
}
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 32; j++) {
    const canvas = new Select({ x: j, y: i });
    menu?.append(canvas.canv);
  }
}

class Input implements Cell {
  canv: HTMLCanvasElement;
  x: number;
  y: number;
  private img: HTMLImageElement;
  public ctx: CanvasRenderingContext2D;
  inArr: boolean;

  constructor(cd: Coords) {
    this.x = cd.x;
    this.y = cd.y;

    this.canv = document.createElement("canvas");

    this.canv.width = 24;
    this.canv.height = 24;
    this.ctx = this.canv.getContext("2d")!;
    this.img = new Image();
    this.img.src = "./sprites.png";
    this.img.onload = () => {
      this.draw({ x: 15, y: 1 });
      // this.ctx.drawImage(this.img, cd.x * 48, cd.y * 48, 48, 48, 0, 0, 24, 24);
    };

    this.canv.addEventListener("mouseover", this.select);
    this.canv.addEventListener("mouseleave", this.deSelect);
    this.inArr = false;
    this.canv.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey) {
        // console.log("kontrola");
        this.canv.removeEventListener("mouseover", this.select);
        this.canv.removeEventListener("mouseleave", this.deSelect);
        selected.push(this);
      } else {
        this.canv.removeEventListener("mouseover", this.select);
        this.canv.removeEventListener("mouseleave", this.deSelect);
        // this.select();
        if (selected) {
          unselect();
        }
        // console.log("brak kontroli");
        selected.push(this);
      }
    });
  }
  draw(cd: Coords) {
    // this.ctx.filter = "brightness(3000%)";
    this.ctx.drawImage(this.img, cd.x * 48, cd.y * 48, 48, 48, 0, 0, 24, 24);
  }
  select = () => {
    // console.log(this);
    this.ctx.filter = "brightness(50%)";
    this.ctx.drawImage(this.canv, 0, 0);
    // console.log("nadlatuje");
  };
  deSelect = () => {
    this.ctx.filter = "brightness(200%)";
    this.ctx.drawImage(this.canv, 0, 0);
    // console.log("odlatuje");
  };
}
const inputs: Array<Array<Input>> = [];
for (let i = 0; i < 50; i++) {
  inputs.push([]);
  for (let j = 0; j < 50; j++) {
    const canvas = new Input({ x: i, y: j });
    inputs[i].push(canvas);
    main?.append(canvas.canv);
  }
}

let selected: Array<Input> = [];
console.log(selected);

function unselect() {
  selected.forEach((element) => {
    // console.log(element);
    element.deSelect();
    element.canv.addEventListener("mouseover", element.select);
    element.canv.addEventListener("mouseleave", element.deSelect);
  });
  selected.length = 0;
}
window.addEventListener("keydown", (e) => {
  // console.log(e.key);

  if (e.key == ("Delete" || "Del")) {
    unselect();
  }
});

main.addEventListener("mousedown", () => {
  main.addEventListener("mousemove", (e) => {
    console.log(e.clientX, e.clientY);
  });
});
