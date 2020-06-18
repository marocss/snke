import p5 from 'p5'

import Snake from './game/components/Snake'
import Food from './game/components/Food'

import onTouch from './utils/onTouch'


const sktch = (sketch: p5) => {      
  let snake: Snake
  const squareSize = 20
  let food: Food
  const borderSize = 10

  const width = (window.innerWidth - borderSize) - ((window.innerWidth - borderSize) % squareSize)
  const height = (window.innerHeight - borderSize) - ((window.innerHeight - borderSize) % squareSize)


  sketch.setup = () => {
    sketch.createCanvas(width, height).parent('game')
    sketch.frameRate(10)

    snake = new Snake(sketch, width, height, squareSize)
    food = new Food(sketch, width, height, squareSize)

    food.create()
  }
  
  sketch.draw = () => {
    sketch.background(65)

    if (snake.eat(food)) {
      food.create()
    }

    food.show()

    snake.update()
    snake.show()
    snake.death()
  }

  sketch.keyPressed = () => {    
    switch (sketch.key) {
      case 'ArrowUp':
        snake.move(0, -1)
        break

      case 'ArrowDown':
        snake.move(0, 1)
        break

      case 'ArrowRight':
        snake.move(1, 0)
        break

      case 'ArrowLeft':
        snake.move(-1, 0)
        break

      default:
        break
    }
  }

  const moveOnSwipe = (direction: string) => {
    switch (direction) {
      case 'up':
        snake.move(0, -1)
        break

      case 'down':
        snake.move(0, 1)
        break

      case 'right':
        snake.move(1, 0)
        break

      case 'left':
        snake.move(-1, 0)
        break

      default:
        break
    }
  }

  window.addEventListener('load', function() {
      var gameWindow = document.getElementById('game')
      onTouch(gameWindow, function(dir: string){
        moveOnSwipe(dir)
      })
  })
}

export default sktch