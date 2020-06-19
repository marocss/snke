import p5 from 'p5'


interface ColorObj {
  r: number
  g: number
  b: number
}

class Food {
  sketch: p5
  squareSize: number
  x: number
  y: number
  w: number
  h: number
  color: ColorObj

  constructor(sketch: p5, gameBoardWidth: number, gameBoardHeight: number, squareSize: number) {
    this.sketch = sketch
    this.squareSize = squareSize
    this.x = 0
    this.y = 0
    this.w = gameBoardWidth
    this.h = gameBoardHeight
    this.color = {
      r: 0,
      g: 255,
      b: 100
    }
  }

  public create(): void {
    let cols = this.sketch.floor(this.w / this.squareSize)
    let rows = this.sketch.floor(this.h / this.squareSize)

    let food = this.sketch.createVector(
      this.sketch.floor(this.sketch.random(cols)), 
      this.sketch.floor(this.sketch.random(rows))
    )

    food.mult(this.squareSize)
    
    this.x = food.x
    this.y = food.y
  }

  public show(): void {
    this.sketch.fill(this.color.r, this.color.g, this.color.b)
    this.sketch.rect(this.x, this.y, this.squareSize, this.squareSize)
  }
}

export default Food