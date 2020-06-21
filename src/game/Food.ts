import p5 from 'p5'

const foodColors = [
  {
    r: 0, // green
    g: 255,
    b: 100
  },
  {
    r: 245, // yellow
    g: 255,
    b: 0
  },
  {
    r: 255, // orange
    g: 157,
    b: 0
  },
  {
    r: 255, // pink
    g: 0,
    b: 88
  },
  {
    r: 0, // blue
    g: 88,
    b: 255
  },
  {
    r: 0, // light blue
    g: 226,
    b: 255
  },
  {
    r: 0, // light green
    g: 255,
    b: 186
  },
  {
    r: 255, // purple
    g: 30,
    b: 255
  },
  {
    r: 88, // bright green
    g: 255,
    b: 0
  },

]
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

  public updateColor(): void {
    let randIndex = Math.floor(this.sketch.random(foodColors.length))
    let colors = foodColors[randIndex]

    this.color.r = colors.r
    this.color.g = colors.g
    this.color.b = colors.b
  }

  public show(): void {
    this.sketch.fill(this.color.r, this.color.g, this.color.b)
    this.sketch.rect(this.x, this.y, this.squareSize, this.squareSize)
  }
}

export default Food