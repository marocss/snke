class Food {
  constructor(sketch, gameBoardWidth, gameBoardHeight, squareSize) {
    this.sketch = sketch
    this.squareSize = squareSize
    this.x = null
    this.y = null
    this.w = gameBoardWidth
    this.h = gameBoardHeight
    this.color = null
  }

  create() {
    let cols = this.sketch.floor(this.w / this.squareSize)
    let rows = this.sketch.floor(this.h / this.squareSize)

    let food = this.sketch.createVector(
      this.sketch.floor(this.sketch.random(cols)), 
      this.sketch.floor(this.sketch.random(rows))
    )

    food.mult(this.squareSize) //
    this.x = food.x
    this.y = food.y
  }

  show() {
    this.sketch.fill(0, 255, 100)
    this.sketch.rect(this.x, this.y, this.squareSize, this.squareSize)
  }
}

export default Food