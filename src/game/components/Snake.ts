import p5 from "p5";
import Food from "./Food";

class Snake {
  sketch: p5
  w: number
  h: number
  squareSize: number
  x: number
  y: number
  xspeed: number
  yspeed: number
  tail: p5.Vector[]
  died: boolean
  ate: boolean

  constructor(sketch: p5, gameBoardWidth: number, gameBoardHeight: number, squareSize: number) {
    this.sketch = sketch
    this.w = gameBoardWidth;
    this.h = gameBoardHeight;
    this.squareSize = squareSize

    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.tail = [];
    this.died = false;
    this.ate = false;
  }

  private eat(food: Food): void {
    let distance = this.sketch.dist(this.x, this.y, food.x, food.y)
    
    this.ate = (distance < 1) ? true : false
  }

  isSnakeDead() {
    if(this.died) {
      return true
    } else {
      return false
    }
  }

  private death(): void {
    for (let i = 0; i < this.tail.length; i++) {
      let tailNode = this.tail[i];
      let distance = this.sketch.dist(this.x, this.y, tailNode.x, tailNode.y);
      
      if (distance < 1) {
        this.tail = []
        this.died = true
      }
    }
  }

  public move(x: number, y: number): void {
    const isMoveBackwards = this.xspeed === (x*-1) || this.yspeed === (y*-1)
    const isFirstMove = this.tail.length === 0 
    
    if (isMoveBackwards && !isFirstMove) {
      return
    }

    this.xspeed = x;
    this.yspeed = y;
  }

  public update(total: number, food: Food): void {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (total >= 1) {
      this.tail[total - 1] = this.sketch.createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * this.squareSize;
    this.y = this.y + this.yspeed * this.squareSize;

    this.x = this.sketch.constrain(this.x, 0, this.w - this.squareSize);
    this.y = this.sketch.constrain(this.y, 0, this.h - this.squareSize);

    this.death()
    this.eat(food)
  }

  public show(): void {
    this.sketch.fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      this.sketch.rect(this.tail[i].x, this.tail[i].y, this.squareSize, this.squareSize);
    }
    this.sketch.rect(this.x, this.y, this.squareSize, this.squareSize);
  } 
}

export default Snake